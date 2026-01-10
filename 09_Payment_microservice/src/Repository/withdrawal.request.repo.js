const { WithdrawalRequest } = require("../models/index");
const CurdRepo = require('./curd.repo');

class WithdrawalRequestRepo extends CurdRepo {
  constructor() {
    super(WithdrawalRequest);
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
  
  async getBydata(data) {
    try {
     
      const res = await this.model.findAll({ where: data });
      
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (getBydata) ");
      throw error;
    }
  }


}


const withdrawalRequestRepo = new WithdrawalRequestRepo();

module.exports = withdrawalRequestRepo;