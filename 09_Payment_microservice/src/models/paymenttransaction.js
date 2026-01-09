'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PaymentTransaction extends Model {
    static associate(models) {
      PaymentTransaction.hasMany(models.WalletTransaction, {
        foreignKey: 'paymentTransactionId'
      });
    }
  }

  PaymentTransaction.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.ENUM('STRIPE', 'KHALTI', 'ESEWA'),
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    gatewayPayload: {
      type: DataTypes.JSON
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'NPR'
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED', 'REFUND'),
      defaultValue: 'PENDING'
    }
  }, {
    sequelize,
    modelName: 'PaymentTransaction'
  });

  return PaymentTransaction;
};
