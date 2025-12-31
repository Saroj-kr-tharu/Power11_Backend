'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ticketConfirms', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
      },
      customerName: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      email: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      email_status: {
      type: Sequelize.ENUM('PENDING', 'FAILED', 'SUCCESS'),
      allowNull: false,
      defaultValue: 'PENDING'
      },
      orderItems: {
      type: Sequelize.JSON,
      allowNull: false,
      },
      orderId: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      shipping_fee: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      tax: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      deliveryEstimatedDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.DATE
      },
      notificationTime: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      transactionId: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      amount: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      currency: {
      type: Sequelize.STRING,
      allowNull: false,
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
    await queryInterface.dropTable('ticketConfirms');
  }
};