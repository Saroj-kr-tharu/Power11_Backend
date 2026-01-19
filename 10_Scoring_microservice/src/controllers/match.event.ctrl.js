const {matchEventService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class MatchEventCtrl { 


    async addMatchEvent(req,res) {
        try {
            const token = req?.headers['x-access-token']; 
            const { matchId, gameId, contestId, playerId, eventType, eventValue,  metadata, createdBy } = req.body;
            // console.log("game id => ", gameId)
            const response = await matchEventService.addMatchEvent({
                matchId,
                gameId,
                contestId,
                playerId,
                eventType, 
                eventValue,
        
                metadata,
                createdBy,
                token
            });
        
            return res.status(SucessCode.OK).json({
                message: "Successfully addMatchEvent",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addMatchEvent) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
    
    async getMatchEvent(req,res) {
        try {
            const response = await matchEventService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllMatchEvent",
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
    
    async updateMatchEvent(req,res) {
        try {
            const { matcheventId } = req.params; 
            const data = req?.body; 
            const response = await matchEventService.updateService(matcheventId,data);
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

    async deleteMatchEvent(req,res) {
        try {
            const { matcheventId } = req.params; 
            const response = await matchEventService.deleteService(matcheventId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deleteMatchEvent",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteMatchEvent) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}



const matchEventCtrl = new MatchEventCtrl();
module.exports = matchEventCtrl;