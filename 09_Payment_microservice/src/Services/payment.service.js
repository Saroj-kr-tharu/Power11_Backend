const crypto = require("crypto")

const {PAYMENT_BACKEND_URL} = require("../config/server.config")

const Service = require('./curd.service');
const khaltiService  =require('./khalti.service')
const stripeService  =require('./stripe.service')
const esewaService  =require('./esewa.service')

const {PaymentTranstionRepo} = require('../Repository/index');

class PaymentService extends Service {
  constructor() {
    super(PaymentTranstionRepo);
  }

  async paymentIntialize(gateway, data) {
        try {
            //1 Create paymentTransaction (PENDING)
            //2 Gateway callback → SUCCESS
            //3 Create walletTransaction (CREDIT)
            //4 Update wallet.balance
            //5 paymentTransaction → wallet Transaction → wallet

            const orderId = "ORD" + crypto.randomBytes(8).toString('hex');
            const result = await PaymentTranstionRepo.create({
                userId: data.userId,
                userEmail: data.email,
                paymentMethod: gateway.toUpperCase(),
                orderId,
                amount: parseInt(data.amount, 10)* 100
            });

           
         
            
            let link ; 
            switch (gateway.toUpperCase()) {
                case 'ESEWA':
                    // link = `${PAYMENT_BACKEND_URL}/initialize-esewa`;
                    // reqBody = {
                    //     transactionId: data.transactionId,
                    //     totalPrice: parseInt(data.Total_Price, 10),
                    //     userEmail: data.userEmail
                    // };
                    break;

                case 'KHALTI':
                    const payload = { 
                        return_url: `${PAYMENT_BACKEND_URL}/khalti/complete/payment?transId=${encodeURIComponent(orderId.toString())}`,
                        website_url: data.website_url || "https://www.fortend.com",
                        amount: parseInt(data.amount, 10), // Convert amount to integer
                        purchase_order_id: orderId,
                        purchase_order_name: "Khalti-"+orderId, 
                        orderId: orderId
                    }
                    
                    link  = await khaltiService.intializePaymentService(payload)
                   
                   
                    break;

                case 'STRIPE':
                    // link = `${PAYMENT_BACKEND_URL}/stripe-initiate/`
                    // reqBody = {
                    //     transactionId: data.transactionId,
                    //     userEmail: data.userEmail,
                    //     amount: data.Total_Price,
                    //     items: data.Seats
                    // }
                    break;
            }

            return link; 



        } catch (error) {
            console.log('Something went wrong in service (PaymentIntialize)', error);
            throw error;
        }
  }

 

}

const paymentService = new PaymentService();
module.exports = paymentService;

