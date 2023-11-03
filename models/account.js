"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  account.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Email: DataTypes.STRING,
      Password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "account",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return account;
};
