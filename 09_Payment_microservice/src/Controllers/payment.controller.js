const { ServerErrosCodes, SucessCode } = require('../utlis/Errors/https_codes');
const {paymentService,walletService, walletWithdrawService } = require('../Services');
const walletWithDrawService = require('../Services/wallet.withdraw.service');


class PaymentController {

    async intilizePayment(req, res) {
        try {

            const {gateway, amount } = req.body;

            const amountNumber = Number(amount);
            if (Number.isNaN(amountNumber) || amountNumber <= 0) 
                throw new Error("Invalid amount");
            
            const amountInPaisa = Math.round(amountNumber * 100);

            const userId = req?.userId;
            const email = req?.email; 
            
            const result = await paymentService.paymentIntialize(gateway, {userId, email, amount:amountInPaisa});

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


    async getWallet(req, res) {
        try {
            const userId = req?.userId;

            const result = await walletService.getByData({userId: userId});
            return res.status(SucessCode.CREATED).json({
                message: "Successfully get Wallet  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (getWallet)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to intialize payment",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getWalletTransation(req, res) {
        try {
            const userId = req?.userId;
            const result = await walletTransService.getWalletTransaction(userId);
            return res.status(SucessCode.CREATED).json({
                message: "Successfully get Wallet Transations  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (getWallet)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to intialize payment",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

   async withdrawRequest(req, res) {
        try {
            const userId = req?.userId;
            const {amount, method , details} = req?.body; 
            const amountNumber = Number(amount);
            if (Number.isNaN(amountNumber) || amountNumber <= 0) 
                throw new Error("Invalid amount");
            
            const amountInPaisa = Math.round(amountNumber * 100);

            const result = await walletWithdrawService.withdrawRequest(userId, amountInPaisa, method , details);
            return res.status(SucessCode.CREATED).json({
                message: "Successfully done withdrawRequest  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (withdrawRequest)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to withdrawRequest",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getWithdraw(req, res) {
        try {
            const userId = req?.userId;


            const result = await walletWithdrawService.getByData({userId: userId});
            return res.status(SucessCode.CREATED).json({
                message: "Successfully All getWithdraw  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (withdrawRequest)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to withdrawRequest",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getWithdrawById(req, res) {
        try {
            
            const { requestId } = req.params;


            const result = await walletWithdrawService.getByData({id: requestId});
            return res.status(SucessCode.CREATED).json({
                message: "Successfully All getWithdraw  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (withdrawRequest)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to withdrawRequest",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async adminUpdate(req, res) {
        try {
            
            const { requestId } = req.params;
            const { status } = req?.body; 
           

            const result = await walletWithDrawService.withdrawAction(requestId, status, );
            return res.status(SucessCode.CREATED).json({
                message: "Successfully All adminUpdate  ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (adminUpdate)',error);
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to adminUpdate",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }


}


const paymentController = new PaymentController();
module.exports = paymentController;