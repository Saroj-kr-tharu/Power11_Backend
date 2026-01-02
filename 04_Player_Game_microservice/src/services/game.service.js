const curdService = require("./curdService");
const {gameRepo} = require('../repository')


class GameService extends curdService{

       constructor(){
        super(gameRepo) 
    }

}

const gameService = new GameService()
module.exports = gameService;