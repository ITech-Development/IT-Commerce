'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
        as: 'product_orders'
      });
      Product.hasMany(models.ProductCart, {
        foreignKey: 'productId',
        as: 'product_carts'
      })
      Product.belongsTo(models.ProductOwner, {
        foreignKey: 'productOwnerId',
        as: 'product_owners'
      })
      Product.belongsTo(models.WarehouseAdmin, {
        foreignKey: 'authorId',
        as: 'authors'
      })
      Product.hasMany(models.ProductType, {
        foreignKey: 'productId',
        as: 'products'
      })
    }
  }

  Product.init({
    name: DataTypes.STRING,
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    minimumOrder: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    productOwnerId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
