const CurdRepo = require("./curd.repo");
const  matchModel = require('../models/match')


class MatchRepo extends CurdRepo { 
    constructor(){
        super(matchModel)
    }; 


    async getByGame(gameId){
        try {
           const res = await matchModel.find({gameId});
           return res; 

        } catch (error) {
            console.log("something went wrong in service  level  (getByGame) ")
             throw error;
           
        }
    }

    
 


}


const matchRepo = new MatchRepo(); 
module.exports = matchRepo; 