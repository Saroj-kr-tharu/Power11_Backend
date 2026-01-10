'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WalletTransaction extends Model {
    static associate(models) {
      WalletTransaction.belongsTo(models.Wallet, {
        foreignKey: 'walletId'
      });

      WalletTransaction.belongsTo(models.PaymentTransaction, {
        foreignKey: 'paymentTransactionId'
      });
    }
  }

  WalletTransaction.init({
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentTransactionId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('CREDIT', 'DEBIT'),
      allowNull: false
    },
    reason: {
      type: DataTypes.ENUM('ADD_MONEY', 'JOIN_CONTEST', 'WIN', 'REFUND', 'WITHDRAW'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    balanceBefore: {
      type: DataTypes.DECIMAL(12, 2), 
      allowNull: false
    },
    balanceAfter: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    referenceType: {
      type: DataTypes.ENUM('CONTEST', 'MATCH', 'WITHDRAW', "PAYMENT"),
    
      allowNull: false
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('SUCCESS', 'FAILED'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'WalletTransaction',
    tableName: 'walletTransactions'
  });

  return WalletTransaction;
};
