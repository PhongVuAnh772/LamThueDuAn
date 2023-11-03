"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment_method", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_method_name: {
                type: Sequelize.STRING,

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payment_method");
  },
};
