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


    // await queryInterface.addColumn('Carts', 'IdCliente', { type: DataTypes.INTEGER, references: { model: 'Carts', key: 'id' } });

    // await queryInterface.addColumn('Carts', "IdProduto", {type: DataTypes.INTEGER, references: { model: 'Produtos', key: 'id'}});

    // await queryInterface.addColumn('Produtos', "IdCategoria", {type: DataTypes.INTEGER, references: {model: 'categoria', key: 'id'}});


    await queryInterface.addColumn('Vendas', 'IdCart', {type: DataTypes.INTEGER, references: { model: 'Carts', key: 'id'}})
    await queryInterface.addColumn('Vendas', 'IdProduto', {type: DataTypes.INTEGER, references: { model: 'Carts', key: 'id'}})
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
