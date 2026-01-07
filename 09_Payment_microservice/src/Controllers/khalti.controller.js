const { ServerErrosCodes, SucessCode } = require('../utlis/Errors/https_codes');
const {  PAYMENT_BACKEND_URL } = require('../config/server.config');
const {khaltiService} = require('../Services');

class KhaltiController {

    async intilizeKhalti(req, res) {
        try {

            
            const data = req.body;
            // console.log('data => ',data)
            const payload = { 
                // return_url: `${MARKETMANDU_URL}/orders/orderFinal?transId=${encodeURIComponent(data.transactionId)}`,
                return_url: `${PAYMENT_BACKEND_URL}/khalti/complete/payment?transId=${encodeURIComponent(data.transactionId)}`,
                // return_url: `${PAYMENT_BACKEND_URL}/khalti/complete/payment`,
                website_url: data.website_url || "https://www.fortend.com",
                amount: parseInt(data.amount, 10), // Convert amount to integer
                purchase_order_id: data.purchase_order_id,
                purchase_order_name: data.purchase_order_name,
                // customer_info: JSON.parse(data.customer_info)
                customer_info: data.customer_info, 
                orderId: data.purchase_order_id
            }


             
            const result = await khaltiService.intializePaymentService(payload);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Intialize Payment ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to intialize payment",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async completePayment(req, res) {
        try {

            const { pidx,  } = req.query;
            const data = {
                pidx
            }

            console.log('data => ', pidx)
            
            const result = await khaltiService.completePaymentService(data);
            

            // res.redirect(`${MARKETMANDU_URL}/orders/orderFinal?transId=${encodeURIComponent(pidx)}`);
            res.redirect(result);

            // return res.status(SucessCode.CREATED).json({
            //     message: " Payment Successfully ",
            //     success: true,
            //     data: result,
            //     err: {},
            // });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Complete-payment",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async failedPayment(req, res) {
        try {


            return res.status(SucessCode.CREATED).json({
                message: " Failed Payment ",
                success: true,
                data: {},
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Complete-payment",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

}


const khaltiController = new KhaltiController();

module.exports = khaltiController;