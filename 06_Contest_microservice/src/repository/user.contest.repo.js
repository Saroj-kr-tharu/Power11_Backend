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

    async updateByUserId(userId,contestId, data) {
        try {
            // console.log("userId => ", userId ,"contestId => ", contestId,  " data => ", data)
            const res = await userContestModel.updateOne(
                { userId, contestId },          
                { $set: data },      
                { runValidators: true }
            );

            return res;
        } catch (error) {
            console.log("Something went wrong in service level (updateByUserId)");
            throw error;
        }
    }

 


}


const userContestRepo = new UserContestRepo(); 

module.exports = userContestRepo; 