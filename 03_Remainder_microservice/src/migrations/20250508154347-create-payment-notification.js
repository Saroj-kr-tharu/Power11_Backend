'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userEmail: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        },
        allowNull:false,
      },
      notificationTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      transitionId: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
       currency: {
        type: Sequelize.STRING,
        allowNull:false
      },
      
      gateway: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email_status: {
        type: Sequelize.ENUM('PENDING','FAILED','SUCCESS'),
        allowNull:false,
        defaultValue:'PENDING'
      },
      payment_status: {
        type: Sequelize.ENUM('PENDING','FAILED','COMPLETE'),
        allowNull:false,
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
    await queryInterface.dropTable('PaymentNotifications');
  }
};