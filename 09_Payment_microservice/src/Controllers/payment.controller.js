const { ServerErrosCodes, SucessCode } = require('../utlis/Errors/https_codes');
const {paymentService} = require('../Services');

class PaymentController {

    async intilizePayment(req, res) {
        try {

            const {gateway, amount } = req.body;
            const userId = req?.userId;
            const email = req?.email; 
            
            const result = await paymentService.paymentIntialize(gateway, {userId, email, amount});

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

   

}


const paymentController = new PaymentController();
module.exports = paymentController;