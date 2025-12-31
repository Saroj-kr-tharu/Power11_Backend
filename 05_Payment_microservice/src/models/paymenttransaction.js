'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paymentTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paymentTransaction.init({
    userEmail: DataTypes.STRING,
    paymentMethod: {
      type: DataTypes.ENUM('ESEWA', 'KHALTI', 'STRIPE', 'COD'),
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionId: DataTypes.STRING,
    
    currency: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    
    status: {
      type: DataTypes.ENUM('FAILED', 'SUCCESS', 'PENDING', 'REFUND'),
      allowNull: false
    },

  }, {
    sequelize,
    modelName: 'paymentTransaction',
  });
  return paymentTransaction;
};