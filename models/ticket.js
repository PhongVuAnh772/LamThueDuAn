"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ticket_description: {
        type: DataTypes.STRING,        
      },
      ticket_price: {
        type: DataTypes.INTEGER,         
      },
      
    },
    {
      sequelize,
      modelName: "ticket",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return ticket;
};
