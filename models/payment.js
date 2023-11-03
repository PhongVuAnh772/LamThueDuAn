"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Order_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      payment_method_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      payment_date: {
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "payment",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return payment;
};
