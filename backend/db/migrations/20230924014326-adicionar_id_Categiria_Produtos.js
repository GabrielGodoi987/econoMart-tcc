'use strict';

const { query } = require('express');
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
    //adicionar coluna que tem chave estrangeira na tabela produtos
    // await queryInterface.addColumn('Produtos', "IdCategoria", {type: DataTypes.INTEGER});


    //removendo createdAt da tabela Produtos
    await queryInterface.removeColumn('Produtos', "createdAt");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //caso houvesse algum erro ao criar a tabela IdCategoria, o comando abaixo apagaria
    await queryInterface.removeColumn('Produtos', 'IdCategoria');
  }
};
