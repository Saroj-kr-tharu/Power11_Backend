const { ServerErrosCodes, SucessCode } = require('../utlis/Errors/https_codes');
const {stripeService} = require('../Services');

class StripeControllers {

    async intilizeStripe(req, res) {
        try {
            let { transactionId, items, amount, userEmail, orderId } = req.body;
            // console.log('items => ', items);
            const data = { items, amount, userEmail, transactionId ,orderId };
            const result = await stripeService.intializePaymentService(data)
            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Intialize Payment Stripe ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)', error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to intialize payment Stripe",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async completePayment(req, res) {
        try {

            const { session_id, transId } = req.query;

            const result = await stripeService.completePaymentService(session_id, transId);

            if (!result) {
                return res.redirect(302, '/payment-error'); // Fallback URL
            }
            return  result;

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

            const { session_id } = req.query;
            await stripeService.failedPaymentService(session_id);

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


const stripeControllers = new StripeControllers();

module.exports = stripeControllers;