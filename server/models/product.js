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
      Product.belongsTo(models.SuperAdmin, {
        foreignKey: 'authorId'
      });
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
        as: 'products'
      });
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
    authorId: DataTypes.INTEGER,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
