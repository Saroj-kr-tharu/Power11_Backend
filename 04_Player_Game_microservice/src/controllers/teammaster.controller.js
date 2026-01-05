const {teamMasterService} = require('../services/index')
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class TeamMasterController { 

    async addTeamMaster(req,res) {
        try {
            const { name, shortName, logo, country, homeCity, status, metadata, createdBy, roles, gameId, team, baseCredits } = req.body;
            const data = {name, shortName, logo, country, homeCity, status, metadata, createdBy, roles, gameId, team, baseCredits};
            const response = await teamMasterService.addTeamMaster(data );
            
            return res.status(SucessCode.OK).json({
                message: "Successfully addTeamMaster",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addTeamMaster) ")
            
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async getAllTeamMaster(req,res) {
        try {
            const response = await teamMasterService.getAllService();
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllTeamMaster",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllTeamMaster) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
    async getAllByGameId(req,res) {
        try {
            const { gameId } = req.params; 
            const response = await teamMasterService.getTeamByGame(gameId);
            return res.status(SucessCode.OK).json({
                message: "Successfully getAllByGameId",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (getAllByGameId) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async updateTeamMaster(req,res) {
        try {
            const { teammasterId } = req.params; 
            const data = req?.body; 
            const response = await teamMasterService.updateService(teammasterId,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully updateTeamMaster",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (updateTeamMaster) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async deleteTeamMaster(req,res) {
        try {
            const { teammasterId } = req.params; 

            const response = await teamMasterService.deleteService(teammasterId);
            return res.status(SucessCode.OK).json({
                message: "Successfully deleteTeamMaster",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteTeamMaster) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}



const teamMasterController = new TeamMasterController();
module.exports = teamMasterController;