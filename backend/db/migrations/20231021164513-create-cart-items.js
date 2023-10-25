'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id_cart: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.FLOAT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartItems');
  }
};