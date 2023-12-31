'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      //uma categoria tem vários produtos
      Category.hasMany(models.Products, {
        foreignKey: "id_category",
      })
    }
  }
  Category.init({
    CategoryName: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Category',
  });
  return Category;
};