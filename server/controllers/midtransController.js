const { User, Profile, Checkout, CheckoutProduct, Product } = require("../models/index");
const midtransClient = require("midtrans-client");
const midtransKey = process.env.MIDTRANS_SERVER_KEY;
let { sequelize } = require("../models/");

class MidtransController {

  // static async midtransTokenIndoRiau(req, res, next) {
  //   try {
  //     const findUser = await User.findByPk(req.user.id)
  //     let snap = new midtransClient.Snap({
  //       // Set to true if you want Production Environment (accept real transaction).
  //       isProduction: false,
  //       serverKey: midtransKey
  //     });
  //     let parameter = {
  //       transaction_details: {
  //         order_id: "TRANS_INDO_RIAU_" + Math.floor(1000000 + Math.random() * 9000000), //harus unique, //harus unique
  //         gross_amount: 10000 //kalkulasikan total harga
  //       },
  //       credit_card: {
  //         secure: true
  //       },
  //       customer_details: {
  //         // first_name: "budi",
  //         // last_name: "pratama",
  //         email: findUser.email,
  //         // phone: "08111222333"
  //       }
  //     };
  //     const midtransToken = await snap.createTransaction(parameter)
  //     res.status(201).json(midtransToken)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  static async midtransTokenIndoRiau(req, res, next) {
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
      console.log(midtransToken, 'midtranstoken');
      const createCheckout = await Checkout.create({
        userId: req.user.id,
        midtransCode: order_id,
        transaction: t
      })
      console.log(req.body.carts, 'ini carts');
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
        // console.log(dec, 'isi dec');
        // console.log(el.id, 'test el id');
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
      console.log(error, 'testerror');
      await t.rollback()
      res.status(500).json(error)
    }
    // try {
    //   const user = await User.findByPk(req.user.id);
    //   let snap = new midtransClient.Snap({
    //     // Set to true if you want Production Environment (accept real transaction).
    //     isProduction: false,
    //     serverKey: "SB-Mid-server-ZQU4wWb0ZkWhko2QA8_bZZGZ",
    //   });

    //   let parameter = {
    //     transaction_details: {
    //       order_id:
    //         "INDOTEKNIK-ORDERID-" +
    //         Math.floor(1000000 + Math.random() * 9000000), //harus unique
    //       gross_amount: +req.query.total, //kalkulasikan total harga di sini
    //     },
    //     credit_card: {
    //       secure: true,
    //     },
    //     customer_details: {
    //       fullName: user.fullName,
    //       email: user.email,
    //       password: user.password,
    //       phoneNumber: user.phoneNumber,
    //       address: user.address,
    //       imageProfile: user.imageProfile,
    //     },
    //   };

    //   const midtransToken = await snap.createTransaction(parameter);
    //   res.status(201).json(midtransToken);
    // } catch (error) {
    //   console.log(error);
    // }
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
      console.log(error, 'testerror');
      await t.rollback()
      res.status(500).json(error)
    }
    // try {
    //   const user = await User.findByPk(req.user.id);
    //   let snap = new midtransClient.Snap({
    //     // Set to true if you want Production Environment (accept real transaction).
    //     isProduction: false,
    //     serverKey: "SB-Mid-server-ZQU4wWb0ZkWhko2QA8_bZZGZ",
    //   });

    //   let parameter = {
    //     transaction_details: {
    //       order_id:
    //         "INDOTEKNIK-ORDERID-" +
    //         Math.floor(1000000 + Math.random() * 9000000), //harus unique
    //       gross_amount: +req.query.total, //kalkulasikan total harga di sini
    //     },
    //     credit_card: {
    //       secure: true,
    //     },
    //     customer_details: {
    //       fullName: user.fullName,
    //       email: user.email,
    //       password: user.password,
    //       phoneNumber: user.phoneNumber,
    //       address: user.address,
    //       imageProfile: user.imageProfile,
    //     },
    //   };

    //   const midtransToken = await snap.createTransaction(parameter);
    //   res.status(201).json(midtransToken);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  static async pay(req, res, next) {
    try {
      if (req.body.transaction_status === 'settlement') {
        await Checkout.update({
          status: 'pay',

        },{
          where: {
            midtransCode: req.body.order_id
          }
        })
      }
      console.log(req.query, 'dari pay');
      console.log(req.body, 'dari pay body');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MidtransController;
