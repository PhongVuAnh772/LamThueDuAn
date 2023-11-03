"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_details", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      Number: {
        type: Sequelize.INTEGER,
      },
      Price: {
        type: Sequelize.DECIMAL,
      },
      Total_money: {
        type: Sequelize.DECIMAL,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_details");
  },
};
