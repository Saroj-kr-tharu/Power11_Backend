const CurdRepo = require("./curd.repo");
const  contestModel = require('../models/contest')


class UserContestRepo extends CurdRepo { 
    constructor(){
        super(contestModel)
    }; 

    async getByMatch(matchId){
            try {
               const res = await contestModel.find({matchId});
               return res; 
    
            } catch (error) {
                console.log("something went wrong in service  level  (getByMatch) ")
                 throw error;
               
            }
    }
 


}


const userContestRepo = new UserContestRepo(); 

module.exports = userContestRepo; 