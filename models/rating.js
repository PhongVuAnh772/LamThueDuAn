"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    static associate(models) {
      // define association here
    }
  }
  rating.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Menu_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      stu_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      Score: {
        type: DataTypes.DECIMAL,
      },
      comment: {
                type: DataTypes.STRING,

      },
      Date_rat: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "rating",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return rating;
};
