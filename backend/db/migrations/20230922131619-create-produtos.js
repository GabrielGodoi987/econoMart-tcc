'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(30)
      },
      descricao: {
        type: Sequelize.STRING(200)
      },
      preco: {
        type: Sequelize.FLOAT
      },
      barCode: {
        type: Sequelize.STRING(256)
      },
      Qtd_estoque: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtos');
  }
};