const express = require("express");
const router = express.Router();
const path = require('path');

const {  eSewaCtrl,  khaltiCtrl,  stripeCtrl, paymentCtrl } = require('../../Controllers/index')
const { eSewaMw,  khaltiMw,  stripeMw, internalMw, paymentMw, userMw } = require('../../Middlewares/index');


router.get('/info', async (req, res) => {
        return res.status(200).json({
            message: 'Payment Service is working Well ',
        });
})


// esewa 
router.get("/esewa", function (req, res) {
    const filePath = path.join(__dirname, '../../Utlis/test.html');
    res.sendFile(filePath);
});
router.post("/initialize-esewa",internalMw.checkInternalServiceToken, eSewaMw.intilize, eSewaCtrl.intilizeEsewa);
router.get("/complete-payment", internalMw.checkInternalServiceToken, eSewaMw.completePayment, eSewaCtrl.completePayment);

// khalti
router.post("/epayment/initiate/",internalMw.checkInternalServiceToken, khaltiMw.intilize, khaltiCtrl.intilizeKhalti);
router.get("/khalti/complete/payment",internalMw.checkInternalServiceToken, khaltiMw.completePayment, khaltiCtrl.completePayment);

//stripe
router.post("/stripe-initiate/",internalMw.checkInternalServiceToken, stripeMw.intilize, stripeCtrl.intilizeStripe);
router.get("/stripe-complete-payment",internalMw.checkInternalServiceToken, stripeMw.completePayment, stripeCtrl.completePayment);
router.get("/stripe-failed-payment",internalMw.checkInternalServiceToken, stripeMw.completePayment, stripeCtrl.failedPayment);


// user Controller 
// router.get("/wallet", internalMw.checkInternalServiceToken, walletCtrl.getWallet);
// router.get("/wallet/balance", internalMw.checkInternalServiceToken, walletCtrl.getBalance);
// router.get("/wallet/transactions", internalMw.checkInternalServiceToken, walletCtrl.getTransactionHistory);

router.post("/initialize", internalMw.checkInternalServiceToken,userMw.validateToken,  paymentMw.intilize, paymentCtrl.intilizePayment);

// // Contest results
// router.post("/contests/result/win", internalMw.checkInternalServiceToken, contestMw.validateResult, contestCtrl.processWin);
// router.post("/contests/result/lose", internalMw.checkInternalServiceToken, contestMw.validateResult, contestCtrl.processLose);
// router.post("/contests/refund", internalMw.checkInternalServiceToken, contestMw.validateRefund, contestCtrl.processRefund);

// Release locked balance (internal use)
// router.post("/contests/release-lock", internalMw.checkInternalServiceToken, contestCtrl.releaseLock);

// // withdrawal
// router.post("/withdrawals/request", internalMw.checkInternalServiceToken, withdrawalMw.validate, withdrawalCtrl.createRequest);
// router.get("/withdrawals", internalMw.checkInternalServiceToken, withdrawalCtrl.getWithdrawals);
// router.get("/withdrawals/:requestId", internalMw.checkInternalServiceToken, withdrawalCtrl.getWithdrawalStatus);

// // Admin routes
// router.patch("/withdrawals/:requestId/approve", internalMw.checkInternalServiceToken, internalMw.checkAdmin, withdrawalCtrl.approveWithdrawal);
// router.patch("/withdrawals/:requestId/reject", internalMw.checkInternalServiceToken, internalMw.checkAdmin, withdrawalCtrl.rejectWithdrawal);


module.exports = router; 