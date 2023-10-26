'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id_purchase: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
        type: Sequelize.INTEGER
      },
      purchaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('purchases');
  }
};