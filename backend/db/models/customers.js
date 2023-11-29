'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customers.hasMany(models.CartItems, {
        foreignKey: 'id_customer'
      })

      customers.belongsTo(models.imagens, {
        foreignKey: 'id_imagem',
        onDelete: 'CASCADE'
      })

      customers.hasOne(models.purchase,{
        foreignKey:'id_customer'
      })
    }
  }
  customers.init({
    custname: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'customers',
  });
  return customers;
};