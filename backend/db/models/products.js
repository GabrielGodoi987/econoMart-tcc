'use strict';
const {
  Model
} = require('sequelize');
const cartitems = require('./cartitems');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Category, {
        foreignKey: 'id_category',
      })

      Products.hasMany(models.CartItems, {
        foreignKey: 'id_product',
      });

      Products.belongsTo(models.imagens, {
        foreignKey: 'id_imagem'
      });

      Products.hasMany(models.purchase, {
        foreignKey: 'id_Product'
      })
    }
  }
  Products.init({
    productname: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    validade: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Products',
  });
  return Products;
};