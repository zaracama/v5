'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Bins',
      'quantity',
      {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 1
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bins', 'quantity')
  }
};
