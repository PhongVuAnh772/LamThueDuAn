"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  payment_method.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_method_name: {
                type: DataTypes.STRING,

      }
    },
    {
      sequelize,
      modelName: "payment_method",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return payment_method;
};
