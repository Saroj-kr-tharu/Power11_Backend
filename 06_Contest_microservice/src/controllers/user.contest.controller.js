const {usercontestService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class UserContestController { 

    async joinUserContest(req,res) {
        try {
            const userId = req?.userId;
            const token = req?.headers['x-access-token']; 
            const { contestId, matchId, gameId, teamId, joinFee} = req?.body; 

            const response = await usercontestService.joinContest({userId, contestId, matchId, gameId, teamId, joinFee, token});
            
        
            return res.status(SucessCode.OK).json({
                message: "Successfully joinUserContest",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (joinUserContest) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }



}


const userContestController = new UserContestController();
module.exports = userContestController;