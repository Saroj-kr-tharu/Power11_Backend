const CurdRepo = require("./curd.repo");
const  playerModel = require('../models/player')


class PlayerRepo extends CurdRepo { 
    constructor(){
        super(playerModel)
    }; 
    
    async getByGameId(gameId){
            try {
               const res = await playerModel.find({gameId});
               return res; 
    
            } catch (error) {
                console.log("something went wrong in service  level  (getByGameId) ")
                 throw error;
               
            }
    }


}


const playerRepo = new PlayerRepo(); 
module.exports = playerRepo; 