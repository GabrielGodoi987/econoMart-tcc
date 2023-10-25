'use strict';
const {
  Model
} = require('sequelize');
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
        foreignKey: "id_category",
        onDelete: 'CASCADE'
      })

      Products.hasMany(models.CartItems, {
        foreignKey: 'id_product'
      });
    }
  }
  Products.init({
    productname: DataTypes.STRING,
    description: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    validate: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Products',
  });
  return Products;
};