"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Order_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
      },
      payment_date: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payment");
  },
};
