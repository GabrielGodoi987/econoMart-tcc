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

    // await queryInterface.removeColumn('Products', 'id_product');
    await queryInterface.addColumn('customers', 'id_imagem', {type: DataTypes.INTEGER, allowNull: false});
    //relacionamento entre categoria e produtos precisa da inserção do id da categoria na tabela produtos
    await queryInterface.addColumn('Products', 'id_category', { type: DataTypes.INTEGER, allowNull: false })
    //construindo o relacionamento entre a tabelas de itens do carrinho 
    await queryInterface.addColumn('CartItems', 'id_customer', { type: DataTypes.INTEGER, allowNull: false });
    await queryInterface.addColumn('CartItems', 'id_product', { type: DataTypes.INTEGER, allowNull: false });

    //construindo os devidos relacionamentos entre tabelas de compras 
    await queryInterface.addColumn('purchases', 'id_cart', { type: DataTypes.INTEGER, allowNull: false });
    await queryInterface.addColumn('purchases', 'id_seller', { type: DataTypes.INTEGER, allowNull: false });
    await queryInterface.addColumn('users', 'accessLevel', {type: DataTypes.INTEGER, allowNull: false});

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
