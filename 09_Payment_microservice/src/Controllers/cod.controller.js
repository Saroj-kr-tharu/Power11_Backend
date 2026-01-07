const { ServerErrosCodes, SucessCode } = require('../utlis/Errors/https_codes');
const {codService} = require('../Services');

class CodController {

    async intilizeCod(req, res) {
        try {

            
            const data = req.body;
            const result = await codService.intializePaymentService(data);

         
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


const codController = new CodController();

module.exports = codController;