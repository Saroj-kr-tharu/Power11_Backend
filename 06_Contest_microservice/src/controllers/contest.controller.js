const {contestService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class ContestController { 

    async addContest(req,res) {
        try {

            const {userId, players, contestId, gameId, totalCredits} = req?.body; 
            const response = await contestService.createService({userId, players, contestId, gameId, totalCredits});
            
        
            return res.status(SucessCode.OK).json({
                message: "Successfully AddGame",
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


    async getAllContest(req,res) {
        try {
            const { contestId, matchId } = req.query; 
            
            let response;
            if (contestId) {
                response = await contestService.getByidService(contestId);
            } else if (matchId) {
                response = await contestService.getByMatch(matchId);
            } else {
                throw new Error("Either contestId or matchId query parameter is required");
            }
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllContest",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllContest) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async updateContest(req,res) {
        try {
            const { teamId } = req.params; 
            const data = req?.body; 
            const response = await contestService.updateService(teamId,data);
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

    async deleteContest(req,res) {
        try {
            const { teamId } = req.params; 
            
            const response = await contestService.deleteService(teamId);
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


const contestController = new ContestController();
module.exports = contestController;