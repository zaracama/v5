'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bin extends Model {
    static associate(models) {
      Bin.belongsTo(models.Cuisine)
      Bin.belongsTo(models.User)
    }
  }
  Bin.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    CuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    quantity: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'Bin',
  });
  return Bin;
};