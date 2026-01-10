const { KHALTI_PAYMENT_URL, KHALTI_SECRET_KEY, KHALTI_VERIFICATION_URL } = require('../config/khalti.config');
const axios = require('axios');
const paymentTransService = require('./payment.transaction.service');
const walletService = require('./wallet.service');
const walletTransService = require('./wallet.transaction.service');
const sendMessageToQueueService = require('./queue.service');
const { sequelize } = require('../models');

class KhaltiService {


    async intializePaymentService(data) {
        try {

            // 1. initialize-khalti

            // -> make a request call to 
            var options = {
                'method': 'POST',
                'url': KHALTI_PAYMENT_URL,
                'headers': {
                    'Authorization': `key ${KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    "return_url": data.return_url,
                    "website_url": data.website_url, 
                    "amount": data.amount ,
                    "purchase_order_id":  data.purchase_order_id,
                    "purchase_order_name": data.purchase_order_name,
    
                })
            }

            const response = await axios(options);
            const result = response?.data;
          
            // set the transitionId 
            await paymentTransService.updateByOrderId(data.purchase_order_id, {transactionId: result.pidx } );
            return result;




        } catch (error) {
            console.log("Something went wrong in service layer (intializePaymentService)");
           
            throw error;
        }
    }


    async #verifyKhaltiPayment(data) {
        try {

            console.log('verify khalti data => ',data );
            // Verify payment with khalti
            var options = {
                'url': KHALTI_VERIFICATION_URL,
                'method': 'POST',
                'headers': {
                    'Authorization': `key ${KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },

                data: JSON.stringify({ 'pidx': data })
            }

            const response = await axios(options);
            // console.log(response.data);
            return response?.data;


        } catch (error) {
            console.log("Something went wrong in service layer (verifyKhaltiService)");
            // console.log('error => ', error?.response);
            throw error;
        }
    }



    async completePaymentService(data) {
        const transaction = await sequelize.transaction();
        
        try {

            // Verify payment with khalti
            const response = await this.#verifyKhaltiPayment(data.pidx);
            // console.log('response from verify data => ', response)

            // check the status 
            if (response.status != 'Completed') {
                await paymentTransService.updateByTransId(response.pidx, { status: 'FAILED' }, { transaction });
                await transaction.commit();
                return 'Payment Failed '
            }
          

            let getdata = await paymentTransService.getDetailsByTransid(response.pidx, { transaction });
            getdata= getdata?.dataValues; 
            // console.log("get data = >", getdata)

            // 1. Gateway callback (SUCCESS)
            // 2. Start DB transaction
            // 3. Find wallet by userId
            //    ├─ If NOT exists → CREATE wallet
            const wallet = await walletService.getByData({ userId: getdata?.userId  }, { transaction });

            if(!wallet){
                await walletService.createService({
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
            }, { transaction })

            
            // 5. Update wallet.balance
            await walletService.updateService(currentWallet?.dataValues?.id, {balance:balanceAfter }, { transaction });
            // 6. Mark paymentTransaction SUCCESS
            await paymentTransService.updateByTransId(response.pidx, { status: 'SUCCESS' }, { transaction });
            // 7. Commit transaction
            await transaction.commit();

            // console.log('getdaa = >', getdata)
            const payload = {
                subject: "Payment Notification System",
                email: getdata.userEmail,
                notificationTime: new Date(),
                gateway: getdata.gateway, 
                transactionId:getdata.transactionId,
                amount: getdata.amount,
                currency: getdata.currency,
                status: getdata.status
            };

            await sendMessageToQueueService(payload, "CREATE_TICKET_PAYMENT");

            // Respond with success messagev
              const orderId = getdata?.orderId;
              const totalAmount = response?.total_amount;
             
 
           return {
            orderId, 
            totalAmount, 
           }



        } catch (error) {
            await transaction.rollback();
            console.log("Something went wrong in service layer (completePaymentService)");
            throw error;
        }
    }


}



const khaltiService = new KhaltiService();

module.exports = khaltiService;