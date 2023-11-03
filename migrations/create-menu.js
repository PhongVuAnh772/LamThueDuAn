"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_name: {
        type: Sequelize.STRING,
      },
      Price: {
        type: Sequelize.DECIMAL
      },
      Menu_type: {
        type: Sequelize.STRING
      },
      Menu_description: {
        type: Sequelize.STRING
      },
      Menu_rating_svg: {
        type: Sequelize.INTEGER
      },
      Menu_image: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("menu");
  },
};
