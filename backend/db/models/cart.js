'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasOne(models.Vendas, {
        foreignKey: 'IdCart'
      }),
      Cart.belongsToMany(models.Produtos, {
        through: 'Vendas',
        foreignKey: 'IdProduto'
      }),
      Cart.belongsTo(models.Clientes,{
        foreignKey:'IdCliente',
      })
    }
  }
  Cart.init({
    quantidade: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};