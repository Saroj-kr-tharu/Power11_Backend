const CurdRepo = require("./curd.repo");
const  userContestModel = require('../models/usercontest')


class UserContestRepo extends CurdRepo { 
    constructor(){
        super(userContestModel)
    }; 

    async getByUser(userId, teamId, matchId,contestId){
            try {
               const res = await userContestModel.find({userId, teamId, matchId,contestId });

               return res; 
    
            } catch (error) {
                console.log("something went wrong in service  level  (getByUser) ")
                 throw error;
               
            }
    }
 


}


const userContestRepo = new UserContestRepo(); 

module.exports = userContestRepo; 