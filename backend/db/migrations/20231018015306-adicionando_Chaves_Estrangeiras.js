'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */


    // await queryInterface.addColumn('Carts', 'IdUser', { type: DataTypes.INTEGER, references: { model: 'Usuarios', key: 'id' } });

    // await queryInterface.removeColumn('Usuarios', "createdAt");
    // await queryInterface.addColumn('Carts', "IdCliente", {type: DataTypes.INTEGER, references: { model: 'Clientes', key: 'id'}});
    // await queryInterface.removeColumn('Vendas', "ProdutoId");


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
