const curdService = require("./curdService");
const {gameRepo} = require('../repository')


class MatchPlayerService extends curdService{

       constructor(){
        super(gameRepo) 
    }

}

const matchPlayerService = new MatchPlayerService()
module.exports = matchPlayerService;