'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PaymentNotification.init({
    transitionId: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    gateway: DataTypes.STRING,
    currency: DataTypes.STRING,
    email_status: DataTypes.ENUM('PENDING', 'FAILED', 'SUCCESS'),
    payment_status: DataTypes.ENUM('PENDING', 'FAILED', 'COMPLETE'),
    userEmail: DataTypes.STRING,
    notificationTime:  DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'PaymentNotification',
  });
  return PaymentNotification;
};