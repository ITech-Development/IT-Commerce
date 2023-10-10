const { User, Profile, Checkout, CheckoutProduct, Product } = require("../models/index");
const midtransClient = require("midtrans-client");
const midtransKey = process.env.MIDTRANS_SERVER_KEY;
const midtransKeyJuvindo = process.env.MIDTRANS_SERVER_KEY_JUVINDO;
const midtransKeyIndoRiau = process.env.MIDTRANS_SERVER_KEY_INDO_RIAU;
let { sequelize } = require("../models/");

class MidtransController {

  static async midtransItech(req, res, next) {
    console.log(req.body, '<<itech');
    const t = await sequelize.transaction();
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: midtransKey,
      });
      let order_id = "ITECH-ORDERID-" +
        Math.floor(1000000 + Math.random() * 9000000)
      let parameter = {
        transaction_details: {
          order_id,
          gross_amount: +req.query.total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          // Avoid sending sensitive user data like password here.
        },
      };
      const midtransToken = await snap.createTransaction(parameter);

      const {
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${checkoutProvince}, ${checkoutCity}, ${checkoutSubdistrict}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        transaction: t
      });

      for (const el of carts) {
        temp.push({
          checkoutId: createCheckout.id,
          productId: el.productId,
          quantity: el.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        let dec = await Product.findOne({ where: { id: el.productId } });
        if (dec && dec.stock >= el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw new Error('Produk tidak memiliki cukup stok.');
        }
      }

      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t });
      await t.commit();
      res.status(201).json({ token: midtransToken.token });
    } catch (error) {
      console.error(error, 'errornya apa');
      await t.rollback();
      res.status(500).json({ message: 'Terjadi kesalahan dalam proses pembayaran.' });
    }
  }


  static async midtransTokenIndoRiau(req, res, next) {
    console.log(req.body, '<<indoriau');
    const t = await sequelize.transaction();
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: midtransKeyIndoRiau,
      });
      let order_id = "INDORIAU-ORDERID-" +
        Math.floor(1000000 + Math.random() * 9000000)
      let parameter = {
        transaction_details: {
          order_id,
          gross_amount: +req.query.total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          // Avoid sending sensitive user data like password here.
        },
      };
      const midtransToken = await snap.createTransaction(parameter);

      const {
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${checkoutProvince}, ${checkoutCity}, ${checkoutSubdistrict}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        transaction: t
      });

      for (const el of carts) {
        temp.push({
          checkoutId: createCheckout.id,
          productId: el.productId,
          quantity: el.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        let dec = await Product.findOne({ where: { id: el.productId } });
        if (dec && dec.stock >= el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw new Error('Produk tidak memiliki cukup stok.');
        }
      }

      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t });
      await t.commit();
      res.status(201).json({ token: midtransToken.token });
    } catch (error) {
      console.error(error, 'errornya apa');
      await t.rollback();
      res.status(500).json({ message: 'Terjadi kesalahan dalam proses pembayaran.' });
    }
  }

  static async midtransTokenJuvindo(req, res, next) {
    console.log(req.body, '<<juvindo');
    const t = await sequelize.transaction();
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: midtransKeyJuvindo,
      });
      let order_id = "JUVINDO-ORDERID-" +
        Math.floor(1000000 + Math.random() * 9000000)
      let parameter = {
        transaction_details: {
          order_id,
          gross_amount: +req.query.total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          // Avoid sending sensitive user data like password here.
        },
      };
      const midtransToken = await snap.createTransaction(parameter);

      const {
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${checkoutProvince}, ${checkoutCity}, ${checkoutSubdistrict}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        transaction: t
      });

      for (const el of carts) {
        temp.push({
          checkoutId: createCheckout.id,
          productId: el.productId,
          quantity: el.quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        let dec = await Product.findOne({ where: { id: el.productId } });
        if (dec && dec.stock >= el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw new Error('Produk tidak memiliki cukup stok.');
        }
      }

      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t });
      await t.commit();
      res.status(201).json({ token: midtransToken.token });
    } catch (error) {
      console.error(error, 'errornya apa');
      await t.rollback();
      res.status(500).json({ message: 'Terjadi kesalahan dalam proses pembayaran.' });
    }
  }

  static async pay(req, res, next) {
    console.log(req.body, 'ini req body pay');
    try {
      if (req.body.transaction_status === 'settlement') {
        await Checkout.update({
          paymentStatus: 'pay',
        }, {
          where: {
            midtransCode: req.body.order_id
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = MidtransController;