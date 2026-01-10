const express = require("express");
const router = express.Router();


const {    khaltiCtrl,  stripeCtrl, paymentCtrl } = require('../../Controllers/index')
const {   khaltiMw,  stripeMw, internalMw, paymentMw, userMw } = require('../../Middlewares/index');


router.get('/info', async (req, res) => {
        return res.status(200).json({
            message: 'Payment Service is working Well ',
        });
})

// wallet
router.post("/initialize", internalMw.checkInternalServiceToken,userMw.validateToken,  paymentMw.intilize, paymentCtrl.intilizePayment);

// khalti
router.get("/khalti/complete/payment",internalMw.checkInternalServiceToken, khaltiMw.completePayment, khaltiCtrl.completePayment);

//stripe
router.get("/stripe-complete-payment",internalMw.checkInternalServiceToken, stripeMw.completePayment, stripeCtrl.completePayment);
router.get("/stripe-failed-payment",internalMw.checkInternalServiceToken, stripeMw.completePayment, stripeCtrl.failedPayment);


// user Controller 
router.get("/wallet", internalMw.checkInternalServiceToken, userMw.validateToken, paymentCtrl.getWallet );
router.get("/wallet/transactions", internalMw.checkInternalServiceToken,userMw.validateToken ,paymentCtrl.getWalletTransation);

// // Contest results
// router.post("/contests/result/win", internalMw.checkInternalServiceToken, contestMw.validateResult, contestCtrl.processWin);
// router.post("/contests/result/lose", internalMw.checkInternalServiceToken, contestMw.validateResult, contestCtrl.processLose);
// router.post("/contests/refund", internalMw.checkInternalServiceToken, contestMw.validateRefund, contestCtrl.processRefund);

// Release locked balance (internal use)
// router.post("/contests/release-lock", internalMw.checkInternalServiceToken, contestCtrl.releaseLock);

// withdrawal
router.post("/withdrawals/request", internalMw.checkInternalServiceToken, userMw.validateToken,  paymentCtrl.withdrawRequest);
router.get("/withdrawals", internalMw.checkInternalServiceToken, userMw.validateToken , paymentCtrl.getWithdraw);
router.get("/withdrawal/:requestId", internalMw.checkInternalServiceToken, userMw.validateToken , paymentCtrl.getWithdrawById);

// Admin routes
router.patch("/withdrawal/:requestId", internalMw.checkInternalServiceToken, userMw.validateToken, paymentCtrl.adminUpdate);


module.exports = router; 