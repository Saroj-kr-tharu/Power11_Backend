const {  ClientErrorsCodes } = require('../utlis/Errors/https_codes');

class StripeValidation {

    intilize(req, res, next) {
        let { transactionId,items, amount, userEmail } = req.body;

        if (!transactionId || !items || !userEmail || !amount  ) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for IntilizeStripe',
                err: 'Missing mandatory properties to create for a StripeValidation'
            });
        }
        next(); 
    }

    completePayment(req, res, next) {
         const { session_id,transId } = req.query;
        
       
        if (!session_id || !transId ) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for update completePayment',
                err: 'Missing mandatory properties to update for a StripeValidation'
            });
        }
        next();
    }

  


}

const stripeValidation = new StripeValidation();
module.exports = stripeValidation;