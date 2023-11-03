"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rating", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Menu_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      stu_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      Score: {
        type: Sequelize.DECIMAL,
      },
      comment: {
        type: Sequelize.STRING,
      },
      Date_rat: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rating");
  },
};
