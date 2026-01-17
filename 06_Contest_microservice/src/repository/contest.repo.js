const CurdRepo = require("./curd.repo");
const  contestModel = require('../models/contest')


class ContestRepo extends CurdRepo { 
    constructor(){
        super(contestModel)
    }; 

    async getByMatch(matchId, filter={}){
            try {
                //  console.log(`matchId => ${matchId} filter => ${filter}`)
               const res = await contestModel.find({matchId, ...filter});
               return res; 
    
            } catch (error) {
                console.log("something went wrong in service  level  (getByMatch) ")
                 throw error;
               
            }
    }
 


}


const contestRepo = new ContestRepo(); 

module.exports = contestRepo; 