'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      });
    }
  }

  ProductCart.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCart',
  });

  return ProductCart;
};
