const { User, Profile, Checkout, CheckoutProduct, Product } = require("../models/index");
const midtransClient = require("midtrans-client");
const midtransKey = process.env.MIDTRANS_SERVER_KEY;
let { sequelize } = require("../models/");

class MidtransController {

  static async midtransTokenIndoRiau(req, res, next) {
    // console.log(req.body, 'indo  riau');
    const t = await sequelize.transaction();
    // console.log(req.user.id);
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: midtransKey,
      });
      let order_id = "INDORIAU-ORDERID-" +
        Math.floor(1000000 + Math.random() * 9000000)
      let parameter = {
        transaction_details: {
          order_id,
          gross_amount: +req.query.total, //kalkulasikan total harga di sini
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imageProfile: user.imageProfile,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      const createCheckout = await Checkout.create({
        userId: req.user.id,
        fullName: user.fullName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        province: req.body.checkoutProvince,
        city: req.body.checkoutCity,
        subdistrict: req.body.checkoutSubdistrict,
        cost: req.body.selectedShippingCost,
        courier: req.body.checkoutCourier,
        shipment: `Service: ${req.body.checkoutPengiriman.service}, Description: ${req.body.checkoutPengiriman.description}`,
        voucherCode: req.body.selectedVoucher,
        midtransCode: order_id,
        transaction: t
      })

      req.body.carts.forEach(async (el) => {
        temp.push({
          // id: await helpers.getId(),
          checkoutId: createCheckout.id,
          productId: el.productId,
          quantity: el.quantity,
          createdAt: new Date(),
          updateAt: new Date(),
        })
        let dec = await Product.findOne({ where: { id: el.productId } });
        if (dec && dec.stock > el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          throw ({ message: 'Data yang anda minta tidak atau terlalu banyak dari stok produk' })
        }
      })
      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t })
      await t.commit()
      res.status(201).json({ token: midtransToken.token })
    } catch (error) {
      console.log(error, 'errornya apa');
      await t.rollback()
      res.status(500).json(error)
    }

  }

  static async midtransTokenJuvindo(req, res, next) {
    const t = await sequelize.transaction();
    // console.log(req.user.id);
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: midtransKey,
      });
      let order_id = "JUVINDO-ORDERID-" +
        Math.floor(1000000 + Math.random() * 9000000)
      let parameter = {
        transaction_details: {
          order_id,
          gross_amount: +req.query.total, //kalkulasikan total harga di sini
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          address: user.address,
          imageProfile: user.imageProfile,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      const createCheckout = await Checkout.create({
        userId: req.user.id,
        midtransCode: order_id,
        transaction: t
      })
      req.body.carts.forEach(async (el) => {
        temp.push({
          // id: await helpers.getId(),
          checkoutId: createCheckout.id,
          productId: el.id,
          quantity: el.quantity,
          createdAt: new Date(),
          updateAt: new Date(),
        })
        let dec = await Product.findOne({ where: { id: el.id } });
        // console.log(el.id, 'el id');
        // console.log(dec.stock, 'dec quantityyyyyyy');
        // console.log(el.quantity, 'el quantityyyyyyy');
        if (dec && dec.stock > el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          // console.log('erorrrrrrrrrrrrrr');
          throw ({ message: 'Data yang anda minta tidak atau terlalu banyak dari stok produk' })
        }
      })
      // await CheckoutProduct.create({
      //   checkoutId: createCheckout.id,
      //   productId: 10,
      //   quantity: 1,
      //   transaction: t
      // })
      // console.log(temp, 'cartsmidtransssssssssssss');
      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t })
      // console.log(bulkCreate, 'bulkkkkkkkkkkkkkkkkkkkkkk');
      await t.commit()
      res.status(201).json({ token: midtransToken.token })
    } catch (error) {
      await t.rollback()
      res.status(500).json(error)
    }
  }

  static async pay(req, res, next) {
    try {
      if (req.body.transaction_status === 'settlement') {
        await Checkout.update({
          status: 'pay',

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