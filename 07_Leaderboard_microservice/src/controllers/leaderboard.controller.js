const {leaderboardService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class LeaderboardController { 

    async getAllLeaderboard(req,res) {
        try {
            const {contestId} = req?.params;
            const response = await leaderboardService.getbyContestId(contestId);
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

 


}


const leaderboardController = new LeaderboardController();
module.exports = leaderboardController;