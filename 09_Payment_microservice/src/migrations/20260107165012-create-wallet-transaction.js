'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('walletTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      walletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wallets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paymentTransactionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'paymentTransactions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      type: {
        type: Sequelize.ENUM("CREDIT", "DEBIT"),
        allowNull: false
      },
      reason: {
        type: Sequelize.ENUM("ADD_MONEY", "JOIN_CONTEST", "WIN", "REFUND", "WITHDRAW"),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      balanceBefore: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      balanceAfter: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      referenceType: {
        type: Sequelize.ENUM("CONTEST", "MATCH", "WITHDRAW", "PAYMENT"),
        allowNull: false
      },
      referenceId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("SUCCESS", "FAILED"),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('walletTransactions');
  }
};