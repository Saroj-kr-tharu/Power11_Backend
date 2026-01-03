const curdService = require("./curd.service");
const {teamRepo} = require('../repository')


class TeamService extends curdService{

       constructor(){
        super(teamRepo) 
    }

}

const teamService = new TeamService()
module.exports = teamService;