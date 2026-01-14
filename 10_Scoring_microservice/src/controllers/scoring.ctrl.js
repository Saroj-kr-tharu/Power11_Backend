const {scoringRulesService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class ScoringCtrl { 


    async addScoreRules(req,res) {
        try {
            const token = req?.headers['x-access-token']; 
            const { gameId, contestId, matchId, eventType, points, conditions } = req.body;
            const response = await scoringRulesService.addScore({ gameId, contestId, matchId, eventType, points, conditions, token });
        
            return res.status(SucessCode.OK).json({
                message: "Successfully addScoreRules",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addScoreRules) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
    
    async getScoreRules(req,res) {
        try {
            const response = await scoringRulesService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllScoreRules",
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
    
    async updateScoreRules(req,res) {
        try {
            const { scoreruleId } = req.params; 
            const data = req?.body; 
            const response = await scoringRulesService.updateService(scoreruleId,data);
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

    async deleteScoreRules(req,res) {
        try {
            const { scoreruleId } = req.params; 
            
            const response = await scoringRulesService.deleteService(scoreruleId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deleteScoreRules",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteScoreRules) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }



}



const scoringCtrl = new ScoringCtrl();
module.exports = scoringCtrl;