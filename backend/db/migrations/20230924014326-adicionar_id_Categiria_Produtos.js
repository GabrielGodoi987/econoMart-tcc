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
    
    // await queryInterface.addColumn('Produtos', 'Validade', {type: DataTypes.STRING,});
    // await queryInterface.addColumn('Produtos', 'Fabricacao', {type: DataTypes.STRING});

    // await queryInterface.removeColumn('Produtos', 'Validade');
    // await queryInterface.removeColumn('Produtos', 'Fabricacao');


    // await queryInterface.addColumn('Produtos', 'IdImagem', {type: DataTypes.INTEGER});



    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //caso houvesse algum erro ao criar a tabela IdCategoria, o comando abaixo apagaria
    // await queryInterface.removeColumn('Produtos', 'IdCategoria');
    
  }
};
