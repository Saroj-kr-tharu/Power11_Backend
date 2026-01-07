const CurdRepo = require("./curd.repo");
const  matchPlayerModel = require('../models/MatchPlayer')


class MatchPlayerRepo extends CurdRepo { 
    constructor(){
        super(matchPlayerModel)
    }; 

    async getMatchByfilter(filter){
        try {
           const res = await this.model.find(filter);
           return res; 

        } catch (error) {
            console.log("something went wrong in service  level  (getMatchByfilter) ")
             throw error;
        }
    }
 

}


const matchPlayerRepo = new MatchPlayerRepo(); 
module.exports = matchPlayerRepo; 