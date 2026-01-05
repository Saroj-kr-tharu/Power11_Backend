const CurdRepo = require("./curd.repo");
const  teamMasterModel = require('../models/teammaster')

class TeamMasterRepo extends CurdRepo { 
    constructor(){
        super(teamMasterModel)
    }; 
 
}


const teamMasterRepo = new TeamMasterRepo(); 
module.exports = teamMasterRepo; 