"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductCart extends Model {
    static associate(models) {
      ProductCart.belongsTo(models.Cart, {
        foreignKey: "cartId",
        as: "cart",
      });
      ProductCart.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  ProductCart.init(
    {
      cartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductCart",
    }
  );

  return ProductCart;
};
