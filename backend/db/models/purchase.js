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
      purchase.hasOne(models.CartItems, {
        foreignKey: 'id_cart'
      });

      purchase.belongsTo(models.sellers, {
        foreignKey: 'id_vendedor'
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