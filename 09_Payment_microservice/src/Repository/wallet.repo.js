const { wallet } = require("../models/index");
const CurdRepo = require('./curd.repo');

class Wallet_repo extends CurdRepo {
  constructor() {
    super(wallet);
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
      console.log("Something went wrong in Repo level (updateByTrans) ");
      throw error;
    }
  }




}


const wallet_repo = new Wallet_repo();

module.exports = wallet_repo;