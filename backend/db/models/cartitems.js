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
      CartItems.belongsTo(models.customers, {
        foreignKey: 'id_customer'
      })

      CartItems.belongsTo(models.sellers, {
        foreignKey: 'id_vendedor'
      })

      CartItems.belongsTo(models.Products, {
        foreignKey: 'id_product'
      });
      
      CartItems.belongsTo(models.purchase, {
        foreignKey: 'id_cart'
      });
    }
  }
  CartItems.init({
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'CartItems',
  });
  return CartItems;
};