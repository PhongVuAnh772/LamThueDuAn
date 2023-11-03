"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ticket", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_description: {
        type: Sequelize.STRING,        
      },
      ticket_price: {
        type: Sequelize.INTEGER,         
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ticket");
  },
};
