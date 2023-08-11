const {
  User,
  Profile,
  Checkout,
  CheckoutProduct,
  Product,
} = require("../models/index");
const midtransClient = require("midtrans-client");
const midtransKey = process.env.MIDTRANS_SERVER_KEY;
let { sequelize } = require("../models/");

class MidtransController {
  static async midtransTokenIndoRiau(req, res) {
    const t = await sequelize.transaction();

    try {
      const user = await User.findByPk(req.user.id);
      const snap = new midtransClient.Snap({
        isProduction: true,
        serverKey: midtransKey,
      });

      const temp = [];
      const carts = req.body.carts;

      const parameter = {
        transaction_details: {
          order_id: `ORDERID-${Math.floor(1000000 + Math.random() * 9000000)}`,
          gross_amount: +req.query.total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          full_name: user.fullName,
          email: user.email,
          phone: user.phoneNumber,
          address: user.address,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      const createCheckout = await Checkout.create({
        userId: req.user.id,
        midtransCode: midtransToken.token,
        transaction: t,
      });

      for (const el of carts) {
        const product = await Product.findOne({ where: { id: el.id } });
        if (product && product.stock >= el.quantity) {
          await CheckoutProduct.create({
            checkoutId: createCheckout.id,
            productId: el.id,
            quantity: el.quantity,
            transaction: t,
          });

          temp.push({
            checkoutId: createCheckout.id,
            productId: el.id,
            quantity: el.quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await product.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw new Error("Insufficient stock for some products");
        }
      }

      await CheckoutProduct.bulkCreate(temp, { transaction: t });
      await t.commit();
      res.status(201).json({ token: midtransToken.token });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: "Transaction failed. Please try again." });
    }
  }

  static async midtransTokenJuvindo(req, res) {
    const t = await sequelize.transaction();

    try {
      const user = await User.findByPk(req.user.id);
      const snap = new midtransClient.Snap({
        isProduction: true,
        serverKey: midtransKey,
      });

      const temp = [];
      const carts = req.body.carts;

      const parameter = {
        transaction_details: {
          order_id: `ORDERID-${Math.floor(1000000 + Math.random() * 9000000)}`,
          gross_amount: +req.query.total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          full_name: user.fullName,
          email: user.email,
          phone: user.phoneNumber,
          address: user.address,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      const createCheckout = await Checkout.create({
        userId: req.user.id,
        midtransCode: midtransToken.token,
        transaction: t,
      });

      for (const el of carts) {
        const product = await Product.findOne({ where: { id: el.id } });
        if (product && product.stock >= el.quantity) {
          await CheckoutProduct.create({
            checkoutId: createCheckout.id,
            productId: el.id,
            quantity: el.quantity,
            transaction: t,
          });

          temp.push({
            checkoutId: createCheckout.id,
            productId: el.id,
            quantity: el.quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await product.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw new Error("Insufficient stock for some products");
        }
      }

      await CheckoutProduct.bulkCreate(temp, { transaction: t });
      await t.commit();
      res.status(201).json({ token: midtransToken.token });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ error: "Transaction failed. Please try again." });
    }
  }
}

module.exports = MidtransController;
