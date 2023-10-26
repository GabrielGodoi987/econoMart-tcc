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
      Products.hasMany(models.Category, {
        foreignKey: "id_category",
        onDelete: 'CASCADE'
      })

      Products.belongsTo(models.CartItems, {
        foreignKey: 'id_product'
      });
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