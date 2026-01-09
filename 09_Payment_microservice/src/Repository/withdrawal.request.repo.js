const { withdrawalRequest } = require("../models/index");
const CurdRepo = require('./curd.repo');

class WithdrawalRequestRepo extends CurdRepo {
  constructor() {
    super(withdrawalRequest);
  }

 

  async getDetailsByTransid(transactionId) {
    try {
      const user = await this.model.findOne({
        where: { transactionId },
      });

      return user;
    } catch (error) {
      console.log("Something went wrong in Repo level (getDetailsByTransid) ");
      throw error;
    }
  }


}


const withdrawalRequestRepo = new WithdrawalRequestRepo();

module.exports = withdrawalRequestRepo;