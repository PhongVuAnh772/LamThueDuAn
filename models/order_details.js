"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  order_details.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      menu_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      Number: {
        type: DataTypes.INTEGER,
      },
      Price: {
        type: DataTypes.DECIMAL,
      },
      Total_money: {
        type: DataTypes.DECIMAL,
      }
      
    },
    {
      sequelize,
      modelName: "order_details",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return order_details;
};
