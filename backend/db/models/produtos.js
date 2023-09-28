'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produtos.belongsTo(models.categoria, {
        foreignKey: 'IdCategoria'
      })
    }
  }
  Produtos.init({
    nome: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    descricao: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    preco: {
      allowNull: false,
      unique: false,
      type: DataTypes.FLOAT
    },
    barCode: {
      allowNull: true,
      type: DataTypes.STRING(256)
    },
    Qtd_estoque: DataTypes.INTEGER,
    //coluna adicionado por queryInterface
    IdCategoria: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Produtos',
  });
  return Produtos;
};