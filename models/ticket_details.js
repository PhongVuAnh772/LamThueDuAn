"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket_details extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  ticket_details.init(
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
      ticket_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      ticket_expDate: {
        type: DataTypes.DATE
      },
      ticket_status: {
        type: DataTypes.BOOLEAN
      }
      
    },
    {
      sequelize,
      modelName: "ticket_details",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return ticket_details;
};
