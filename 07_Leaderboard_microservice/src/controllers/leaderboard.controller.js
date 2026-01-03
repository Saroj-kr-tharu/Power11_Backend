const {leaderboardService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class LeaderboardController { 

    async addLeaderboard(req,res) {
        try {

            const {userId, players, contestId, gameId, totalCredits} = req?.body; 
            const response = await leaderboardService.createService({userId, players, contestId, gameId, totalCredits});
            
        
            return res.status(SucessCode.OK).json({
                message: "Successfully addLeaderboard",
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


    async getAllLeaderboard(req,res) {
        try {
            const response = await leaderboardService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllLeaderboard",
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

    async updateLeaderboard(req,res) {
        try {
            const { leaderboardId } = req.params; 
            const data = req?.body; 
            const response = await leaderboardService.updateService(leaderboardId,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updateLeaderboard",
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

    async deleteLeaderboard(req,res) {
        try {
            const { leaderboardId } = req.params; 
            
            const response = await leaderboardService.deleteLeaderboard(leaderboardId);
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


const leaderboardController = new LeaderboardController();
module.exports = leaderboardController;