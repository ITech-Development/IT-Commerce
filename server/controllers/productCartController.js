const { ProductCart, Cart, Product, User } = require("../models");
let { sequelize } = require("../models/");

class ProductCartController {
  static async getAllProductCarts(req, res, next) {
    try {
      let findedCart = await Cart.findOne({
        where: { userId: req.user.id },
      });
      let cartId = findedCart.id;
      const productCarts = await ProductCart.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            as: "product",
          },
          {
            model: Cart,
            as: "cart",
          },
        ],
      });
      res.status(200).json(productCarts);
    } catch (error) {
      next(error);
    }
  }

  static async getAllProductItechs(req, res, next) {
    try {
      let findedCart = await Cart.findOne({
        where: { userId: req.user.id },
      });
      let cartId = findedCart.id;
      const productCarts = await ProductCart.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            as: "product",
            where: { productOwnerId: 3 },
          },
          {
            model: Cart,
            as: "cart",
          },
        ],
      });
      res.status(200).json(productCarts);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProductIndoRiaus(req, res, next) {
    try {
      let findedCart = await Cart.findOne({
        where: { userId: req.user.id },
      });
      let cartId = findedCart.id;
      const productCarts = await ProductCart.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            as: "product",
            where: { productOwnerId: 1 },
          },
          {
            model: Cart,
            as: "cart",
          },
        ],
      });
      res.status(200).json(productCarts);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProductJuvindos(req, res, next) {
    try {
      let findedCart = await Cart.findOne({
        where: { userId: req.user.id },
      });
      let cartId = findedCart.id;
      const productCarts = await ProductCart.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            as: "product",
            where: { productOwnerId: 2 },
          },
          {
            model: Cart,
            as: "cart",
          },
        ],
      });
      res.status(200).json(productCarts);
    } catch (error) {
      console.log(error);
    }
  }

  static async detailsProductCart(req, res, next) {
    try {
      const productCart = await ProductCart.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Cart,
            as: "cart"
          },
        ]
      })
      if (productCart) {
        res.status(200).json(productCart)
      } else {
        throw { name: 'NotFoundError' }
      }
    } catch (error) {
      next(error)
    }
  }

  static async incrementQtyProductCart(req, res, next) {
    const t = await sequelize.transaction();
    let id = req.params.id;
    try {
      let productCart = await ProductCart.findOne({
        where: { id },
      });
      if (productCart) {
        let product = await Product.findOne({
          where: { id: productCart.productId },
        });
        if (product && product.stock > 0) {
          await productCart.increment("quantity", { by: 1, transaction: t });
          await product.decrement("stock", { by: 1, transaction: t });
        }
      }
      await t.commit();
    } catch (error) {
      console.log(error, "error increment");
      await t.rollback();
      next(error);
    }
  }

  static async decrementQtyProductCart(req, res, next) {
    const t = await sequelize.transaction();
    let id = req.params.id;
    try {
      let dec = await ProductCart.findOne({ where: { id } });
      if (dec && dec.quantity > 1) {
        await dec.decrement("quantity", { by: 1, transaction: t });

        let find = await Product.findOne({ where: { id: dec.productId } });
        if (find) {
          await find.increment("stock", { by: 1, transaction: t });
        }
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async removeProductCart(req, res, next) {
    const id = req.params.id;
    try {
      const productC = await ProductCart.findOne({ where: { id } });
      if (!productC) {
        res.status(404).json({ message: "Product not found in cart" });
      }

      const product = await Product.findOne({
        where: { id: productC.productId },
      });
      if (product) {
        // Menambahkan stok produk yang dihapus
        await product.increment("stock", { by: productC.quantity });

        await productC.destroy();

        return res.status(200).json({ message: "Product removed from cart" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error, "remooooove");
      next(error);
    }
  }

  static async clearProductCart(req, res, next) {
    try {
      const deletedProductCarts = await ProductCart.findAll(); // Mengambil semua produk dalam keranjang
      await ProductCart.destroy({ where: {} }); // Menghapus semua produk dari keranjang

      // Mengembalikan stok produk yang dihapus
      for (const productCart of deletedProductCarts) {
        const product = await Product.findOne({
          where: { id: productCart.productId },
        });
        if (product) {
          await product.increment("stock", { by: productCart.quantity });
        }
      }

      return res
        .status(200)
        .json({ message: "All products removed from cart" });
    } catch (error) {
      console.log(error, "removed all");
      next(error);
    }
  }

  static async addProductCart(req, res, next) {
    
    const t = await sequelize.transaction();
    const { id } = req.body;
    try {
      let findedCart = await Cart.findOne({ where: { userId: req.user.id } });
      let idTemp;

      if (!findedCart) {
        let createdC = await Cart.create(
          { userId: req.user.id },
          { transaction: t }
        );
        idTemp = createdC.id;
      } else {
        idTemp = findedCart.id;
      }

      let checkPC = await ProductCart.findOne({
        where: {
          cartId: idTemp,
          productId: id,
        },
      });

      if (checkPC) {
        await checkPC.increment("quantity", { by: 1, transaction: t });
      } else {
        await ProductCart.create(
          {
            cartId: idTemp,
            productId: id,
            quantity: 1,
          },
          { transaction: t }
        );
      }

      // let findedProduct = await Product.findOne({ where: { id } });
      // await findedProduct.decrement("stock", { by: 1, transaction: t });

      await t.commit();
      res.status(201).json({ msg: "berhasil" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}
module.exports = ProductCartController;
