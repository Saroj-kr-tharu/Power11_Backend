const curdService = require("./curd.service");
const {playerRepo} = require('../repository')

class TeamMasterService extends curdService{

    constructor(){
        super(playerRepo) 
    }

}

const teamMasterService = new TeamMasterService()
module.exports = teamMasterService;