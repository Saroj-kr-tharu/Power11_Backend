const Service = require('./curd.service');
const {WithdrawalRequestRepo} = require('../Repository/index');

const walletService = require('./wallet.service')
const { sequelize } = require('../models');

class WalletWithDrawService extends Service {
  constructor() {
    super(WithdrawalRequestRepo);
  }

  async getByData(data) {
    try {

      const res = await WithdrawalRequestRepo.getBydata(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getByData)");
      throw error;
    }
  }

  async withdrawRequest(userId, amount, method , details) {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. check the user wallet it is active or not and check the balance avaialble
      const validMethods = ['STRIPE', 'ESEWA', 'KHALTI', 'BANK_TRANSFER'];
      if(!validMethods.includes(method.toUpperCase()))
        throw new Error("Invalid withdrawal method");

      let wallet =  await walletService.getByData({userId: userId},);
      wallet = wallet?.dataValues;

      if(wallet.status != "ACTIVE")
        throw new Error("Wallet Suspended")

      if(wallet.balance < amount)
        throw new Error("Insufficient Balance")

      // 2. reduce the wallet into locked balance 
      const balance = wallet.balance - amount ; 
      const lockedBalance = Number(wallet.lockedBalance) + amount ;

      const lockedBalanceNum = parseFloat(lockedBalance);
      
      await walletService.updateService(wallet.id, {balance: balance, lockedBalance: lockedBalanceNum}, { transaction })

      // 3.  entry into the withdrawRequest
      const data = {
        userId: userId,
        walletId: wallet.id,
        amount: amount,
        currency: wallet.currency,
        method: method.toUpperCase(), 
        accountDetails: details, 
      }; 
     
      const res = await WithdrawalRequestRepo.create(data, { transaction })

      await transaction.commit();
      return res; 

     
    } catch (error) {
      await transaction.rollback();
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }

  



}

const walletWithDrawService = new WalletWithDrawService();
module.exports = walletWithDrawService;