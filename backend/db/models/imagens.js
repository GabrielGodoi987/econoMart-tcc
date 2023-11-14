'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imagens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      imagens.hasOne(models.customers, {
        foreignKey: 'id_imagem',
        onDelete: 'CASCADE'
      })
      imagens.hasOne(models.Products, {
        foreignKey: 'id_imagem'
      })
      imagens.hasOne(models.user, {
        foreignKey: 'id_imagem'
      })
    }
  }
  imagens.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'imagens',
  });
  return imagens;
};