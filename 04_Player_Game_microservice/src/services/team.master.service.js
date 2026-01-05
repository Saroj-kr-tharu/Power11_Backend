const curdService = require("./curd.service");
const {teamMasterRepo} = require('../repository')
const gameService = require('./game.service')

class TeamMasterService extends curdService{

    constructor(){
        super(teamMasterRepo) 
    }

    async addTeamMaster(data){
        try {
            // 1. check the game is present 
            const gamedata = await gameService.getByidService(data.gameId)
            if(!gamedata) throw new Error(" Game is not Found ")
            
           
            // 2. add the team
            const res = await this.createService(data)
            return res;

        } catch (error) {
            console.log("something went wrong in service  level  (addTeamMaster) ")
             throw error;
           
        }
    }


    async getTeamByGame(gameId){
        try {
            // 1. check the game is present
            const gamedata = await gameService.getByidService(gameId)
            if(!gamedata) throw new Error(" Game is not Found ")
            
            // // 2. get all the teammaster who play that game
            const res = await teamMasterRepo.getByGameId(gamedata._id)
            return res;

        } catch (error) {
            console.log("something went wrong in service  level  (addTeamMaster) ")
             throw error;
           
        }
    }

}

const teamMasterService = new TeamMasterService()
module.exports = teamMasterService;