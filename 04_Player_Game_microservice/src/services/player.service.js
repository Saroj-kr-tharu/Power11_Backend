const curdService = require("./curd.service");
const {playerRepo} = require('../repository')

class PlayerService extends curdService{

    constructor(){
        super(playerRepo) 
    }

}

const playerService = new PlayerService()
module.exports = playerService;