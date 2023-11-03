"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Account_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        
      },
      stu_Fname: DataTypes.STRING,
      stu_Class: DataTypes.STRING,
      stu_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "student",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return student;
};
