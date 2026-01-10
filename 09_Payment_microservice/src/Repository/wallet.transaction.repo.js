const { WalletTransaction } = require("../models/index");
const CurdRepo = require('./curd.repo');

class WalletTransactionRepo extends CurdRepo {
  constructor() {
    super(WalletTransaction);
  }

  async updateByTrans(id, data) {
    try {
    
      const res = await this.model.update(data, {
        where: {
          transactionId: id,
        },
      });

      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
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


const walletTransactionRepo = new WalletTransactionRepo();

module.exports = walletTransactionRepo;