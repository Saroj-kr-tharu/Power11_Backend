const paymentTransService = require('./payment.transaction.service');
const { STRIPE_FAILED_URL, STRIPE_SUCCESS_URL } = require('../config/stripe.config');
const stripe = require('../config/stripe.connect');
const walletService = require('./wallet.service');
const walletTransService = require('./wallet.transaction.service');
const sendMessageToQueueService = require('./queue.service');
const { sequelize } = require('../models');

class StripeService {


    async intializePaymentService(data) {
        try {
            // 1. initialize-stripe
            console.log('data fro stripe intialize => ', data)
        
           
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
               line_items: [
                {
                    price_data: {
                        currency: "NPR",
                        product_data: {
                            name: "Wallet Deposit",
                            description: "Add funds to your account"
                        },
                        unit_amount: data.amount * 100,
                    },
                    quantity: 1
                }
            ],
                success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}&transId=${data.transactionId}`,
                cancel_url: `${STRIPE_FAILED_URL}?session_id={CHECKOUT_SESSION_ID}`,
            })


            await paymentTransService.updateByOrderId(data.transactionId, {transactionId: session.id } );
            return session.url;

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

    async completePaymentService(data, transactionId) {
        const transaction = await sequelize.transaction();
        try {
            const response = await this.#checkPaymentStatus(data);
            // check the status 
            if (response != 'paid') {
                await transaction.rollback();
                return "failed Payment";
            }

            // Get payment details
            let getdata = await paymentTransService.getDetailsByTransid(data);
            getdata = getdata.dataValues;

            // 1. Gateway callback (SUCCESS)
            // 2. DB transaction started above
            // 3. Find wallet by userId - If NOT exists → CREATE wallet
            let wallet = await walletService.getByData({ userId: getdata?.userId }, { transaction });

            if (!wallet) {
                wallet = await walletService.createService({
                    userId: getdata?.userId,
                    balance: 0,
                    lockedBalance: 0,
                    currency: getdata?.currency || 'NPR',
                    status: 'ACTIVE'
                }, { transaction });
            }

            // 4. Create walletTransaction (CREDIT)
            const currentWallet = await walletService.getByData({ userId: getdata?.userId }, { transaction });
            const balanceBefore = parseFloat(currentWallet?.balance) || 0;
            const balanceAfter = balanceBefore + (parseFloat(getdata?.amount) || 0);

            await walletTransService.createService({
                walletId: currentWallet?.id,
                paymentTransactionId: getdata?.id,
                type: 'CREDIT',
                reason: 'ADD_MONEY',
                amount: getdata?.amount,
                balanceBefore: balanceBefore,
                balanceAfter: balanceAfter,
                referenceType: 'PAYMENT',
                referenceId: getdata?.orderId,
                status: 'SUCESS' 
            }, { transaction });

            // 5. Update wallet.balance
            await walletService.updateService(currentWallet?.dataValues?.id, { balance: balanceAfter }, { transaction });

            // 6. Mark paymentTransaction SUCCESS
            await paymentTransService.updateByTransId(data, { status: 'SUCCESS' }, { transaction });
            console.log('done ')
            // 7. Commit transaction
            await transaction.commit();

            // Send notification after successful commit
            const payload = {
                subject: "Payment Notification System",
                email: getdata.userEmail,
                notificationTime: new Date(),
                gateway: 'Stripe',
                transactionId: getdata.transactionId,
                amount: getdata.amount,
                currency: 'npr',
                status: 'COMPLETE',
            };
            // await sendMessageToQueueService(payload, "CREATE_TICKET_PAYMENT");
               console.log('done again')
            return   'Payment completed successfully' ;

        } catch (error) {
            await transaction.rollback();
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