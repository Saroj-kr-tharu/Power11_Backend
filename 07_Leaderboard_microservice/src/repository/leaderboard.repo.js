const CurdRepo = require("./curd.repo");
const  leaderboardModel = require('../models/leaderboard')


class LeaderboardRepo extends CurdRepo { 
    constructor(){
        super(leaderboardModel)
    }; 
    
    async findOrCreate(whereData, updateData, options = {}) {
        try {
            const res = await this.model.findOneAndUpdate(
                whereData,
                updateData,
                options 
            );
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (findOrCreate)");
            throw error;
        }
    }

    async findDataByContest(contestId) {
        try {
           const res = await leaderboardModel.find({ contestId })
                .sort({ totalPoints: -1 })
                .exec();
                
            return res; 
        } catch (error) {
            console.log("Something went wrong in Repo level (findDataByContest)");
            throw error;
        }
    }

    async findDataByRank(contestId) {
        try {
            const res = await this.model.find({ contestId })
                .sort({ rank: 1 }) 
                .exec();
                
            return res; 
        } catch (error) {
            console.log("Something went wrong in Repo level (findDataByRank)");
            throw error;
        }
    }
    
    async updateBydata(wheredata, updateData) {
        try {
            const res = await this.model.updateOne(wheredata, updateData);
            return res;
        } catch (error) {
            console.log("Something went wrong in Repo level (updateBydata)");
            throw error;
        }
    }

    async bulkWrite(operations) {
        try {
            return await leaderboardModel.bulkWrite(operations);
        } catch (error) {
            console.log("Something went wrong in Repo level (bulkWrite)");
            throw error;
        }
    }

}


const leaderboardRepo = new LeaderboardRepo(); 
module.exports = leaderboardRepo; 