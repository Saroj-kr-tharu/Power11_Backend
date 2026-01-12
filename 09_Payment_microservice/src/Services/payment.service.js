const crypto = require("crypto")

const {PAYMENT_BACKEND_URL} = require("../config/server.config")

const Service = require('./curd.service');
const khaltiService  =require('./khalti.service')
const stripeService  =require('./stripe.service')
const idempotancyKeyService  =require('./idempotancy.key.service')


const {PaymentTranstionRepo} = require('../Repository/index');

class PaymentService extends Service {
  constructor() {
    super(PaymentTranstionRepo);
  }

  async paymentIntialize(gateway, data) {
        try {
            // 0 check the idempotancy 
                console.log("data => ", data.idempotencyKey)
                const requestHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
                let key = null; 
                key = await idempotancyKeyService.getByData({key: data.idempotencyKey});
               
                if(key && requestHash == key?.requestHash) {
                    if(key?.status == "IN_PROGRESS") throw new Error(" PROCESSING_THIS_REQUEST")
                    console.log("request dupplicated = hitted", )
                    return key?.responseSnapshot;
                }
                
                await idempotancyKeyService.createService({
                    key: data.idempotencyKey,
                    userId: data.userId, 
                    operation: 'ADD_MONEY',
                    requestHash:requestHash ,
                    responseSnapshot: {},
                    status: 'IN_PROGRESS'
                })

            //1 Create paymentTransaction (PENDING)
            //2 Gateway callback → SUCCESS
            //3 Create walletTransaction (CREDIT)
            //4 Update wallet.balance
            //5 paymentTransaction → wallet Transaction → wallet

            const orderId = "ORD" + crypto.randomBytes(8).toString('hex');
            let result =  await PaymentTranstionRepo.create({
                userId: data.userId,
                userEmail: data.email,
                paymentMethod: gateway.toUpperCase(),
                orderId,
                amount: data.amount
            });

            result = result?.dataValues; 
        
            
            let link ; 
            let payload; 
            switch (gateway.toUpperCase()) {
               

                case 'KHALTI':
                    payload = { 
                        return_url: `${PAYMENT_BACKEND_URL}/khalti/complete/payment?transId=${encodeURIComponent(orderId.toString())}`,
                        website_url: data.website_url || "https://www.fortend.com",
                        amount: data.amount,
                        purchase_order_id: orderId,
                        purchase_order_name: "Khalti-"+orderId, 
                        orderId: orderId
                    }
                    link  = await khaltiService.intializePaymentService(payload)
                    break;

                case 'STRIPE':
                    
                    payload = {
                        transactionId: result?.orderId,
                        userEmail: data.email,
                        amount: data.amount,
                    }
                    
                    link = await stripeService.intializePaymentService(payload)
                    break;
            }

             await idempotancyKeyService.updateByData(
                { key: data.idempotencyKey },
                { responseSnapshot: link, status: "SUCCESS" }
            );
            return link; 



        } catch (error) {
            console.log('Something went wrong in service (PaymentIntialize)', error);
            throw error;
        }
  }

  

 

}

const paymentService = new PaymentService();
module.exports = paymentService;

