const {usercontestService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class UserContestController { 

    async joinUserContest(req,res) {
        try {
            const userId = req?.userId;
            const email = req?.email;
            const token = req?.headers['x-access-token']; 
            const { contestId, matchId, gameId, teamId, joinFee} = req?.body; 

            const response = await usercontestService.joinContest({userId, contestId, matchId, gameId, teamId, joinFee, token, email});
            
        
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


    async updateUserContest(req,res) {
        try {

            const { userId, contestId } = req.params;  
            const data = req?.body; 
            // console.log("userId => ", userId , " data => ", data)
            const response = await usercontestService.updateService(userId,contestId, data);
            // console.log("res => ", response)
        
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