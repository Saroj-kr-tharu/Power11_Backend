const Service = require('./curd.service');
const {IdempotancyKeyRepo} = require('../Repository/index');


class WalletWithDrawService extends Service {
  constructor() {
    super(IdempotancyKeyRepo);
  }

  async getByData(data) {
    try {
      const res = await IdempotancyKeyRepo.getBydata(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getByData)");
      throw error;
    }
  }

  async updateByData(where, updateData,) {
    try {
      
      const res = await IdempotancyKeyRepo.updateBydata(where, updateData);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByData)");
      throw error;
    }
  }


}

const walletWithDrawService = new WalletWithDrawService();
module.exports = walletWithDrawService;