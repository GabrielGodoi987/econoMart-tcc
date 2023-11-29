'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //uma compra pode ter apenas um carrinho
      purchase.belongsTo(models.itensCarrinho, {
        foreignKey: 'id_item'
      });

      purchase.belongsTo(models.Products, {
        foreignKey: 'id_Product'
      });

      purchase.belongsTo(models.customers, {
        foreignKey: 'id_customer'
      })
    }
  }
  purchase.init({
    purchaseDate: DataTypes.DATE,
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'purchase',
  });
  return purchase;
};