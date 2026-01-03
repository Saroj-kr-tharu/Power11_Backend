const {teamService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class TeamController { 

    async addTeam(req,res) {
        try {

            const {userId, players, contestId, gameId, totalCredits} = req?.body; 
            const response = await teamService.createService({userId, players, contestId, gameId, totalCredits});
            
           
            
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


    async getAllTeam(req,res) {
        try {
            const response = await teamService.getAllService();
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

    async updateTeam(req,res) {
        try {
            const { teamId } = req.params; 
            const data = req?.body; 
            const response = await teamService.updateService(teamId,data);
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

    async deleteTeam(req,res) {
        try {
            const { teamId } = req.params; 
            
            const response = await teamService.deleteService(teamId);
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


const teamController = new TeamController();
module.exports = teamController;