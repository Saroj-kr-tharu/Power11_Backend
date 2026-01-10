const Service = require('./curd.service');
const {WalletTransactionRepo} = require('../Repository/index');

const walletService = require('./wallet.service')

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

  

  async getWalletTransaction( userId) {
    try {
      // 1. get wallet details ;
      let  wallet=   await walletService.getByData({userId: userId})
      wallet =  wallet?.dataValues;

      if(!wallet || wallet.status != "ACTIVE")
        throw new Error(" Wallet or User Wallet is Suspended ")

      // 2 get walletTransaaction 
      let res = await WalletTransactionRepo.getBydata({walletId: wallet.id});
      return res; 

    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

}

const walletTransactionService = new WalletTransactionService();
module.exports = walletTransactionService;