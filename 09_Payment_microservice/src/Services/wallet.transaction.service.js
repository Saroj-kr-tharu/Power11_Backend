const Service = require('./curd.service');
const {WalletTransactionRepo} = require('../Repository/index');

class WalletTransactionService extends Service {
  constructor() {
    super(WalletTransactionRepo);
  }

  async updateByTransId(transId, data) {
    try {

      const res = await WalletTransactionRepo.updateByTrans(transId, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

}

const walletTransactionService = new WalletTransactionService();
module.exports = walletTransactionService;