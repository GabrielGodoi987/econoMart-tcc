'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sellers', {
      id_vendedor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        onDelete: "CASCADE",
        field: 'id',
        type: Sequelize.INTEGER
      },
      sllername: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sellers');
  }
};