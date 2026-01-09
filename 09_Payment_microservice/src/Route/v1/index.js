const express = require("express");
const router = express.Router();
const path = require('path');

const {  eSewaCtrl,  khaltiCtrl,  stripeCtrl, codCtrl } = require('../../Controllers/index')
const { eSewaMw,  khaltiMw,  stripeMw, internalMw } = require('../../Middlewares/index');


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





module.exports = router; 