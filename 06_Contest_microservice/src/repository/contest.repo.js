const CurdRepo = require("./curdRepo");
const  contestModel = require('../models/contest')


class ContestRepo extends CurdRepo { 
    constructor(){
        super(contestModel)
    }; 
 


}


const contestRepo = new ContestRepo(); 

module.exports = contestRepo; 