"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    static associate(models) {
      // define association here
    }
  }
  orders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      stu_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      order_date: {
        type: DataTypes.DATE,
      },
      Note: {
        type: DataTypes.STRING,
      },
      Order_status: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "orders",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return orders;
};
