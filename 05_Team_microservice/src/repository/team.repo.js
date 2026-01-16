const CurdRepo = require("./curd.repo");
const  teamModel = require('../models/teams')


class TeamRepo extends CurdRepo { 
    constructor(){
        super(teamModel)
    }; 

    async getByUserId(userId){
        try {
           const res = await this.model.find({userId});
           return res; 
        } catch (error) {
            console.log("something went wrong in service  level  (getByUserId) ")
             throw error;
        }
    }

    async getBydata(data) {
        try {
            const res = await this.model.find(data);
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (getBydata) ");
            throw error;
        }
    }
 


}


const teamRepo = new TeamRepo(); 

module.exports = teamRepo; 