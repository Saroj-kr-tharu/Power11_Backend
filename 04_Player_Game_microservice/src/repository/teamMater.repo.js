const CurdRepo = require("./curd.repo");
const  teamMasterModel = require('../models/teammaster')

class TeamMasterRepo extends CurdRepo { 
    constructor(){
        super(teamMasterModel)
    }; 

    async getByGameId(gameId){
        try {
           const res = await teamMasterModel.find({gameId})
        ;
           return res; 

        } catch (error) {
            console.log("something went wrong in service  level  (getByGameId) ")
             throw error;
           
        }
    }
 
}


const teamMasterRepo = new TeamMasterRepo(); 
module.exports = teamMasterRepo; 