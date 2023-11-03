"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stu_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      Note: {
        type: Sequelize.STRING,
      },
      Order_status: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
