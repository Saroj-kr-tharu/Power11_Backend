const CurdRepo = require("./curd.repo");
const  MatchLiveState = require('../models/matchLiveState')


class MatchLiveStateRepo extends CurdRepo { 
    constructor(){
        super(MatchLiveState)
    }; 


    async getBydata(data) {
        try {
            const res = await this.model.findOne(data );
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (getBydata) ");
            throw error;
        }
    }
  
    async updateBydata(whereData, updateData) {
        try {
        // console.log("where => ", where, " updatedData =>  ", updateData)
        const res = await this.model.update(updateData, { where: whereData });
        return res;
        } catch (error) {
        console.log("Something went wrong in Repo level (updateBydata)");
        throw error;
        }
    }

    async FindAndUpdate(where, updateData, options = {}) {
        try {
            const finalOptions = {  ...options };
            const res = await this.model.findOneAndUpdate(where, updateData, finalOptions);
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (updateByData):", error);
            throw error;
        }
    }

 
}


const matchLiveStateRepo = new MatchLiveStateRepo(); 
module.exports = matchLiveStateRepo; 