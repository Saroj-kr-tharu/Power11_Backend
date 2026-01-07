const {matchPlayerService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class MatchPlayerController { 

    
    async getAllMatchPlayer(req,res) {
        try {
           const { filter } = req.body;          
            const response = await matchPlayerService.getMatchFilter(filter);
            
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllMatchPlayer",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) { 
            console.log("something went wrong in controller  level  (getAllMatchPlayer) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
   


}



const matchPlayerController = new MatchPlayerController();
module.exports = matchPlayerController;