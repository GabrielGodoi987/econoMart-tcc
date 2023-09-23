'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association herez
      Categoria.hasMany(models.Produtos, {
        foreignKey: 'IdCategoria',
        keyType: 'INTEGER',
      })
    }
  }
  Categoria.init({
    nomeCategoria: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};