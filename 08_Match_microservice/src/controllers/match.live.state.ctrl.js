const {matchLiveStateService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class MatchLiveStateCTRL { 

    async addMatchLiveState(req,res) {
        try {
           
            const { matchId, gameId, progress } = req?.body;
             const token = req?.headers['x-access-token']; 
            const response = await matchLiveStateService.UpdateLiveState({matchId, gameId, progress, token });
            
        
            return res.status(SucessCode.OK).json({
                message: "Successfully addMatchLiveState",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addMatchLiveState) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getAllMatchLiveState(req,res) {
        try {
            const { gameId, MatchLiveStateId } = req.query; 
            
            let response;
            if (MatchLiveStateId) {
                response = await matchLiveStateService.getByidService(MatchLiveStateId);
            } else if (gameId) {
                response = await matchLiveStateService.getMatchLiveStateByGame(gameId);
            } 
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllMatchLiveState",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllMatchLiveState) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async updateMatchLiveState(req,res) {
        try {
            const { liveStateId } = req.params; 
            const data = req?.body; 
            const response = await matchLiveStateService.updateService(liveStateId,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updateMatchLiveState",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (updateMatchLiveState) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async deleteMatchLiveState(req,res) {
        try {
            const { liveStateId } = req.params; 
            
            const response = await matchLiveStateService.deleteService(liveStateId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deleteMatchLiveState",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteMatchLiveState) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}


const matchLiveStateCTRL = new MatchLiveStateCTRL();
module.exports = matchLiveStateCTRL;