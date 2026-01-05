const {matchService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class MatchController { 

    async addMatch(req,res) {
        try {

            const {gameId, title, matchType, teams, venue, startTime, endTime, status, squadAnnounced, result, metadata, createdBy} = req?.body; 
            const response = await matchService.createService({gameId, title, matchType, teams, venue, startTime, endTime, status, squadAnnounced, result, metadata, createdBy});
            
        
            return res.status(SucessCode.OK).json({
                message: "Successfully addMatch",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addTeam) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getAllMatch(req,res) {
        try {
            const response = await matchService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllMatch",
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

    async updateMatch(req,res) {
        try {
            const { matchId } = req.params; 
            const data = req?.body; 
            const response = await matchService.updateService(matchId,data);
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

    async deleteMatch(req,res) {
        try {
            const { matchId } = req.params; 
            
            const response = await matchService.deleteService(matchId);
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


const matchController = new MatchController();
module.exports = matchController;