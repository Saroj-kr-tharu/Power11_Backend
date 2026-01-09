const {  ClientErrorsCodes } = require('../utlis/Errors/https_codes');

class PaymentValidation {

    intilize(req, res, next) {
        const { amount, gateway,   } = req.body;

        if (!amount || !gateway   ) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for PaymentValidation',
                err: 'Missing mandatory properties to Initilze Payment'
            });
        }
        next();
    }

    


}

const paymentValidation = new PaymentValidation();
module.exports = paymentValidation;