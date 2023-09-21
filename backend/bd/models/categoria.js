'use strict';
const {
  Model
} = require('sequelize');
const produtos = require('./produtos');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.hasMany(produtos, {foreignKey: 'id_categoria'});
    }
  }
  Categoria.init({
    id_categoria: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.NUMBER
    },
    nome_categoria: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};