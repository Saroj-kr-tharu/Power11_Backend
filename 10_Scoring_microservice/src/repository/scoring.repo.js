const CurdRepo = require("./curd.repo");
const  scoringRulesModel = require('../models/scoringRules')


class ScoringRepo extends CurdRepo { 
    constructor(){
        super(scoringRulesModel)
    }; 
 
    async getBydata(data) {
        try {
            const res = await this.model.findOne({ where: data });
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (getBydata) ");
            throw error;
        }
    }

    async updateBydata(where, updateData) {
        try {
            // console.log("where => ", where, " updatedData =>  ", updateData)
            const res = await this.model.update(updateData, { where });
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (updateBydata)");
            throw error;
        }
    }

}


const scoringRepo = new ScoringRepo(); 

module.exports = scoringRepo; 