const CurdRepo = require("./curd.repo");
const  matchEventModel = require('../models/matchEvent')

class MatchEventRepo extends CurdRepo { 
    constructor(){
        super(matchEventModel)
    }; 

    async getByGameId(gameId){
        try {
           const res = await this.model.find({gameId})        ;
           return res; 

        } catch (error) {
            console.log("something went wrong in service  level  (getByGameId) ")
             throw error;
           
        }
    }
 
}


const matchEventRepo = new MatchEventRepo(); 
module.exports = matchEventRepo; 