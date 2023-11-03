"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Account_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        
      },
      stu_Fname: Sequelize.STRING,
      stu_Class: Sequelize.STRING,
      stu_address: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("student");
  },
};
