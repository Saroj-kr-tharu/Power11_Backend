const Service = require('./curd.service');
const {WalletRepo} = require('../Repository/index');

class WalletService extends Service {
  constructor() {
    super(WalletRepo);
  }

  async getByData(data) {
    try {

      const res = await WalletRepo.getBydata(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

  

}

const walletService = new WalletService();
module.exports = walletService;