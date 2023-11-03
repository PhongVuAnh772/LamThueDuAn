"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    static associate(models) {
      // define association here
    }
  }
  menu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      menu_name: {
        type: DataTypes.STRING,
      },
      Price: {
        type: DataTypes.DECIMAL
      },
      Menu_type: {
        type: DataTypes.STRING
      },
      Menu_description: {
        type: DataTypes.STRING
      },
      Menu_rating_svg: {
        type: DataTypes.INTEGER
      },
      Menu_image: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "menu",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return menu;
};
