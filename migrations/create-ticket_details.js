"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ticket_details", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stu_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      ticket_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      ticket_expDate: {
        type: Sequelize.DATE
      },
      ticket_status: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ticket_details");
  },
};
