'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Order, {
        foreignKey: 'productId',
        as: 'orders'
      })
      Product.belongsTo(models.ProductCategory, {
        foreignKey: 'categoryId',
        as: 'categories'
      })
      Product.belongsTo(models.ProductType, {
        foreignKey: 'typeId',
        as: 'types'
      })
      Product.belongsTo(models.SuperAdmin, {
        foreignKey: 'authorId'
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
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};