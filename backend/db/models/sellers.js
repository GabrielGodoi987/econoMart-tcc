'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  sellers.init({
    sllername: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'sellers',
  });
  return sellers;
};