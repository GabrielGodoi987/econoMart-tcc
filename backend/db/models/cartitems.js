'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
/* -------------------------------------------------------------- */
      //um carrinho tem apenas um cliente
      CartItems.belongsTo(models.customers, {
        foreignKey: 'id_customer'
      })
      //um carrinho tem 0 ou vários produtos
      CartItems.belongsTo(models.Products, {
        foreignKey: 'id_product'
      });
    }
  }
  CartItems.init({
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    timestamps: false,
    modelName: 'CartItems',
  });
  return CartItems;
};