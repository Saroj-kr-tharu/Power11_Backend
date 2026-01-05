const curdService = require("./curd.service");
const {matchRepo} = require('../repository')

class MatchService extends curdService{

       constructor(){
        super(matchRepo) 
        }

}

const MatchService = new MatchService()
module.exports = MatchService;