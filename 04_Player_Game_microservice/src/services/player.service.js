const curdService = require("./curd.service");
const {playerRepo} = require('../repository')
const gameService  = require('./game.service')

class PlayerService extends curdService{

    constructor(){
        super(playerRepo) 
    }

    async addPlayer({name, roles, gameId, team,baseCredits}){
        try {
            // 1. check the game is present 
            const gamedata = await gameService.getByidService(gameId)
            if(!gamedata) throw new Error(" Game is not Found ")

            // 2. add the player 
            const res = await this.createService({name, roles, gameId, team,baseCredits})
            return res;

        } catch (error) {
            console.log("something went wrong in service  level  (addPlayer) ")
             throw error;
           
        }
    }

    async getTeamByGame(gameId){
        try {
            // 1. check the game is present
            const gamedata = await gameService.getByidService(gameId)
            if(!gamedata) throw new Error(" Game is not Found ")
            
            // // 2. get all the teammaster who play that game
            const res = await playerRepo.getByGameId(gamedata._id)
            return res;

        } catch (error) {
            console.log("something went wrong in service  level  (addTeamMaster) ")
             throw error;
           
        }
    }

}

const playerService = new PlayerService()
module.exports = playerService;