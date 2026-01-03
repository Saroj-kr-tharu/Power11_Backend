const CurdRepo = require("./curd.repo");
const  teamModel = require('../models/teams')


class TeamRepo extends CurdRepo { 
    constructor(){
        super(teamModel)
    }; 
 


}


const teamRepo = new TeamRepo(); 

module.exports = teamRepo; 