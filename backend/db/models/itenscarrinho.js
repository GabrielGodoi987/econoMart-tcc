'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class itensCarrinho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      itensCarrinho.belongsTo(models.Products, {
        foreignKey: "id_product",
      });
      
      itensCarrinho.hasMany(models.purchase, {
        foreignKey: 'id_item'
      })
      
    }
  }
  itensCarrinho.init({
    id_product: DataTypes.INTEGER,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    timestamps: false,
    modelName: 'itensCarrinho',
  });
  return itensCarrinho;
};