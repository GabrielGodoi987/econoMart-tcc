'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.imagens, {
        foreignKey: 'id_imagem'
      })
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    accessLevel: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'user',
  });
  return user;
};