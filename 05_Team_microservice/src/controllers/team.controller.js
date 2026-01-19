const {teamService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class TeamController { 

    async addTeam(req,res) {
        try {

            const { players,matchId, contestId, gameId, totalCredits} = req?.body; 
            const userId = req.userId;
            const token = req?.headers['x-access-token'];
            const response = await teamService.createTeam({userId, players, contestId,matchId, gameId, totalCredits, token});
            
            return res.status(SucessCode.OK).json({
                message: "Successfully createdTeam",
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
            const userId = req.userId;
            const response = await teamService.getBydata({userId: userId});
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllGame",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllTeam) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getTeamById(req,res) {
        try {
            const { teamId } = req.params; 
            const response = await teamService.getByidService(teamId);
            return res.status(SucessCode.OK).json({
                message: "Successfully getTeamById",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getTeamById) ")
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
           
            const response = await teamService.updateTeam(teamId, data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updateTeam",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (updateTeam) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

     async updateTeamAdmin(req,res) {
        try {
            const { teamId } = req.params; 
            const data = req?.body; 
            console.log('data => ', data, "  teamId => ", teamId)
            const response = await teamService.updateTeamByAdmin({TeamId:teamId, data});
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

    async getBydata(req,res) {
        try {
            const {data} = req?.body;
            const response = await teamService.getBydata(data);
            return res.status(SucessCode.OK).json({
                message: "Successfully getBydata",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getBydata) ")
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