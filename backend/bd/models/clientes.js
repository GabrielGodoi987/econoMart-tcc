'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clientes.init({
    id_cliente: {
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true
    },
    nome_cliente: DataTypes.STRING(30),
    endereco: DataTypes.STRING(200),
    telefone: DataTypes.STRING(10),
    email: DataTypes.STRING(50),
    data_Registro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};