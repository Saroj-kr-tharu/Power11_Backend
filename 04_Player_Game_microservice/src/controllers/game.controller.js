const {gameService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class GameController { 

    async addGame(req,res) {
        try {
            
            const {name,maxPlayers, creditLimit, rolesConfig, scoringRules, status, rulesVersion} = req?.body; 
            const response = await gameService.createService({name,maxPlayers, creditLimit, rolesConfig, scoringRules, status, rulesVersion});
            
            return res.status(SucessCode.OK).json({
                message: "Successfully AddGame",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addGame) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getAllGame(req,res) {
        try {
            const response = await gameService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllGame",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllGame) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async updateGame(req,res) {
        try {
            const { gameId } = req.params; 
            const data = req?.body; 
            const response = await gameService.updateService(gameId,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updateGame",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (updateGame) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async deleteGame(req,res) {
        try {
            const { gameId } = req.params; 
            
            const response = await gameService.deleteService(gameId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deleteGame",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteGame) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}



const gameController = new GameController();

module.exports = gameController;