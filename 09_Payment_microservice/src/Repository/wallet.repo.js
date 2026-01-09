const { Wallet } = require("../models/index");
const CurdRepo = require('./curd.repo');



class Wallet_repo extends CurdRepo {
  constructor() {
    super(Wallet);
    
  }

  async getBydata(data) {
    try {
     
      const res = await this.model.findOne({ where: data });
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (getBydata) ");
      throw error;
    }
  }




}


const wallet_repo = new Wallet_repo();

module.exports = wallet_repo;