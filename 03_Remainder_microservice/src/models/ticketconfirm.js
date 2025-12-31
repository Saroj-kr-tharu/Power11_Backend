'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticketConfirm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ticketConfirm.init({
    customerName: DataTypes.STRING,
    email: DataTypes.STRING,
    email_status: DataTypes.ENUM('PENDING', 'FAILED', 'SUCCESS'),
    shipping_fee:DataTypes.STRING,
    tax:DataTypes.STRING,
    deliveryEstimatedDate: DataTypes.DATE,
    orderItems: DataTypes.JSON, 
    orderId: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    amount: DataTypes.STRING,
    currency: DataTypes.STRING,

   
    notificationTime: DataTypes.STRING,
    



  }, {
    sequelize,
    modelName: 'ticketConfirm',
  });
  return ticketConfirm;
};