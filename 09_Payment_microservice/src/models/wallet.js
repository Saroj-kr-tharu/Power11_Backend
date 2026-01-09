'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      Wallet.hasMany(models.WalletTransaction, {
        foreignKey: 'walletId',
        as: 'transactions'
      });

      Wallet.hasMany(models.WithdrawalRequest, {
        foreignKey: 'walletId',
        as: 'withdrawals'
      });
    }
  }

  Wallet.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    lockedBalance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'SUSPENDED'),
      allowNull: false,
      defaultValue: 'ACTIVE'
    }
  }, {
    sequelize,
    modelName: 'Wallet',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'currency'] 
      }
    ]
  });

  return Wallet;
};
