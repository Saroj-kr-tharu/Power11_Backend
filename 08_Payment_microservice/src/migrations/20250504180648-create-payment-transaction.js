'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paymentTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: 'npr',
      },

      transactionId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      orderId: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },


      status: {
        type: Sequelize.ENUM({
          values: ['FAILED', 'SUCCESS', 'PENDING', 'REFUND']
        }),
        defaultValue: 'PENDING',
      },
      paymentMethod: {
        type: Sequelize.ENUM({
          values: ['ESEWA', 'KHALTI', 'STRIPE', 'COD']
        }),
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
    await queryInterface.dropTable('paymentTransactions');
  }
};