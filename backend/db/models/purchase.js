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
      purchase.hasMany(models.CartItems, {
        foreignKey: 'id_cart'
      });
    }
  }
  purchase.init({
    purchaseDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};