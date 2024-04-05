'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Bin)
    }
  }
  User.init({
    discord: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This discord already registered'
      },
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  },
   {
    sequelize,
    modelName: 'User',
  });
  return User;
};