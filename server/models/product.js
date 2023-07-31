'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        foreignKey: 'categoryId',
        as: 'categories'
      });
      Product.belongsTo(models.ProductType, {
        foreignKey: 'typeId',
        as: 'types'
      });
      Product.belongsTo(models.Voucher, {
        foreignKey: 'voucherId',
        as: 'vouchers',
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
        as: 'product_orders'
      });
      Product.hasMany(models.ProductCart, {
        foreignKey: 'productId',
        as: 'product_carts'
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    condition: DataTypes.STRING,
    description: DataTypes.TEXT,
    minimumOrder: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
    shippingInsurance: DataTypes.STRING,
    deliveryService: DataTypes.STRING,
    voucherId: DataTypes.INTEGER,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
