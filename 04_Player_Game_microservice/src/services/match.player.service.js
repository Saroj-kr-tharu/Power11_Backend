const curdService = require("./curd.service");
const {gameRepo} = require('../repository')


class MatchPlayerService extends curdService{

       constructor(){
        super(gameRepo) 
    }

}

const matchPlayerService = new MatchPlayerService()
module.exports = matchPlayerService;