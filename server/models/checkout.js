'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Checkout.init({
    fullName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    subdistrict: DataTypes.STRING,
    courier: DataTypes.STRING,
    shipment: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    voucherCode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    midtransCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};