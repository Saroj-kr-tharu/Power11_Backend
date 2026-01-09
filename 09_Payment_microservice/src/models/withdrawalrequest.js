'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WithdrawalRequest extends Model {
    static associate(models) {
      WithdrawalRequest.belongsTo(models.Wallet, {
        foreignKey: 'walletId'
      });
    }
  }

  WithdrawalRequest.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.ENUM('STRIPE', 'ESEWA', 'KHALTI'),
      allowNull: false
    },
    accountDetails: {
      type: DataTypes.JSON,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('REQUESTED', 'PROCESSING', 'SUCCESS', 'REJECTED'),
      defaultValue: 'REQUESTED'
    },
    adminRemark: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'WithdrawalRequest',
    tableName: 'withdrawalRequests'
  });

  return WithdrawalRequest;
};
