'use strict';
const {
  Model
} = require('sequelize');
const categoria = require('./categoria');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produtos.belongsTo(categoria, { foreignKey: 'id_categoria' })
    }
  }
  Produtos.init({
    id_produto: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    image_Products: DataTypes.STRING,
    nome_Produto: DataTypes.STRING,
    descricao: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    Qtd_estoque: DataTypes.NUMBER,
    barcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produtos;
};