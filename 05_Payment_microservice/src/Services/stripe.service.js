const paymentTransactionService = require('./payment.transaction.service');
const { MARKETMANDU_URL, APIGATEWAY_BACKEND_URL } = require('../config/server.config');
const { STRIPE_FAILED_URL, STRIPE_SUCCESS_URL } = require('../config/stripe.config');
const stripe = require('../config/stripe.connect');
const rabbitMqService = require('../Utlis/messageQueue');
const axios = require('axios');

class StripeService {


    async intializePaymentService(data) {
        try {
            // 1. initialize-stripe
            console.log('data fro stripe intialize => ', data)
            const products = await Promise.all(
                data.items.map(async (item) => {
                    
                    // const linkRes = `${MARKETMANDU_URL}/product?id=${item.productId}`;
                    const linkRes = `${APIGATEWAY_BACKEND_URL}/marketmandu/product?id=${item.productId}`; 

                    const response = await axios.get(linkRes);

                    if (!response.data) throw new Error("Product not found");

                    const product = response.data.data; 

                    // console.log('item => ', product)

                    return {
                        name: product.name,
                        unit_amount: Math.round(product.price * 100),
                        quantity: item.quantity
                    };
                })
            );

            console.log('all products => ', products)



            // get product details 
            

            // -> create session 
            // const quan= data.items.length;
            console.log('data item => ', data ) ;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: products.map(p => ({
                    price_data: {
                        currency: "NPR",
                        product_data: { name: p.name },
                        unit_amount: p.unit_amount
                    },
                    quantity: p.quantity
                })),
                success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}&transId=${data.transactionId}`,
                cancel_url: `${STRIPE_FAILED_URL}?session_id={CHECKOUT_SESSION_ID}`,
            })

            // console.log('session => ', session);

            // -> create Record at transitionTable 
            const transactionId = await session.id;
            let finalData = {
                 userId: data.userId, amount: data.amount,userEmail:data.userEmail, status:'PENDING', currency: 'USD', transactionId, paymentMethod: "STRIPE", orderId:data.orderId };

            await paymentTransactionService.createService(finalData);


            return session.url





        } catch (error) {
            console.log("Something went wrong in service layer (intializePaymentService)");
            throw error;
        }
    }

    async #checkPaymentStatus(sessionId,transId) {
        try {
            // Retrieve the session details using the session ID
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            // Check the payment status
            const paymentStatus = session.payment_status;

            return paymentStatus;
        } catch (error) {
            console.log("Something went wrong in service layer (checkPaymentStatus)");
            throw error;
        }
    }

    async completePaymentService(data,transactionId) {
        try {

            // 
            const response = await this.#checkPaymentStatus(data);
            // console.log('response => ', response);

            // check the status 
            if (response != 'paid') return;

            // update status 
            await paymentTransactionService.updateByTransId(data, { status: 'SUCCESS' });

            // send queue to send msg to remainder service 
            // -> transition id , amount , date , gateway , email_status
            const getdata = await paymentTransactionService.getDetailsByTransid(data);
            const Details = getdata.dataValues;

            const payload = {
                subject: "Payment Notification System",
                email: Details.userEmail,
                notificationTime: new Date(),
                gateway: 'Stripe',
                transactionId: Details.transactionId,
                amount: Details.amount,
                currency: 'npr',
                status: 'COMPLETE', 
 
            };
             await rabbitMqService.sendMessageToQueueService(payload);
            // Respond with success message
            // const link = `${MOVIE_BOOKING_URL}/FinalComplete?transId=${encodeURIComponent(transactionId)}`
            const link = `${MARKETMANDU_URL}/orders/orderFinal?orderNO=${Details.orderId}&total_amount=${Details.amount}&trans_id=${Details.transactionId}`;
            return link;






        } catch (error) {
            console.log("Something went wrong in service layer (completePaymentService)");
            throw error;
        }
    }


    async failedPaymentService(data) {
        try {

            // 
            const response = await this.#checkPaymentStatus(data);
            // console.log('response => ', response);

            // check the status 
            if (response != 'unpaid') return;

            // update status 
            await paymentTransactionService.updateByTransId(data, { status: 'FAILED' });
            // send queue to send msg to remainder service 
            // -> transition id , amount , date , gateway , email_status
            const getdata = await paymentTransactionService.getDetailsByTransid(data);

            const payload = {
                subject: "Payment Notification System",
                email: getdata.userEmail,
                notificationTime: new Date(),
                gateway: 'Stripe',
                transactionId:getdata.transactionId,
                amount: getdata.amount,
                currency: 'usd',
                status: 'FAILED'
            };
            const res = await rabbitMqService.sendMessageToQueueService(payload);
            // Respond with success message
            return res;


        } catch (error) {
            console.log("Something went wrong in service layer (completePaymentService)");
            throw error;
        }
    }


}



const stripeService = new StripeService();

module.exports = stripeService;