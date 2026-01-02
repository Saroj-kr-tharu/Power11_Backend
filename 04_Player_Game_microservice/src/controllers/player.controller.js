const {playerService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class PlayerController { 

    async addPlayer(req,res) {
        try {
            const { name, roles, gameId, team,baseCredits,}  = req.body;

            const response = await playerService.createService({name, roles, gameId, team,baseCredits,} );
            
            return res.status(SucessCode.OK).json({
                message: "Successfully addPlayer",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addPlayer) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getAllPlayer(req,res) {
        try {
            const response = await playerService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllPlayer",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllPlayer) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async updatePlayer(req,res) {
        try {
            const { playerId } = req.params; 
            const data = req?.body; 
            const response = await playerService.updateService(playerId,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updatePlayer",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (updatePlayer) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async deletePlayer(req,res) {
        try {
            const { playerId } = req.params; 

            const response = await playerService.deleteService(playerId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deletePlayer",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deletePlayer) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}



const playerController = new PlayerController();

module.exports = playerController;