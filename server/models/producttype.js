'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // ProductType.hasMany(models.ProductCategory)
      // ProductType.hasMany(models.Product, {
      //   foreignKey: 'typeId',
      //   as: 'products'
      // })
      ProductType.hasMany(models.ProductCategory, {
        foreignKey: 'typeId',
        as: 'types'
      })
      ProductType.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'products'
      })
    }
  }
  ProductType.init({
    name: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};