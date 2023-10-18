'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vendas.belongsTo(models.Cart, {
        foreignKey: "IdCart",
      }),
      Vendas.belongsTo(models.Usuarios, {
        foreignKey: 'IdUsuario'
      })
    }
  }
  Vendas.init({
    Quantidade: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Vendas',
  });
  return Vendas;
};