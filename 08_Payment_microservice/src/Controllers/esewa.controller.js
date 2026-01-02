const { ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');
const {esewaService} = require('../Services');
class ESewaController {

    async intilizeEsewa(req, res) {
        try {

            const { transactionId, totalPrice, userEmail,orderId } = req.body;
            const data = { amount: totalPrice, userEmail,transactionId, orderId }

            const result = await esewaService.intializePaymentService(data);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Intialize Payment ",
                success: true,
                data: {...result, ...data},
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
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

            const { data } = req.query;
            const result = await esewaService.completePaymentService(data);
            
            if (!result) {
                return res.redirect(302, '/payment-error'); // Fallback URL
            }
            return res.redirect(302, result);

            

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


const eSewaController = new ESewaController();

module.exports = eSewaController;