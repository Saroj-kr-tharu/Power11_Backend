const curdService = require("./curd.service");
const {contestRepo} = require('../repository')


class ContestService extends curdService{

       constructor(){
        super(contestRepo) 
    }

}

const contestService = new ContestService()
module.exports = contestService;