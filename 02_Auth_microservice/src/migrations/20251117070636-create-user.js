'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5, 500],
        },
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

      role: {
        allowNull: false,
        type: Sequelize.ENUM("CUSTOMER", "ADMIN"),
        defaultValue: "CUSTOMER"
      },

      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};