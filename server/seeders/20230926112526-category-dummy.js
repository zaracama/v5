'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const catalogs = [
      {
        name: 'Makanan Ringan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Makanan Domestik',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Makanan Internasional',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Minuman',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    await queryInterface.bulkInsert('Catalogs', catalogs)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Catalogs', null, {});
  }
};
