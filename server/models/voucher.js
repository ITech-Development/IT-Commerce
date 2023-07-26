'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.hasMany(models.Product, {
        foreignKey: 'voucherId',
        as: 'products', // Nama asosiasi untuk akses relasi ke Product
      });
    }
  }
  Voucher.init({
    voucherCode: DataTypes.STRING,
    image: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};