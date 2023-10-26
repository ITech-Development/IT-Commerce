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

      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      let order_id = `INV/${currentDate}/ITE/` +
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
        pajak,
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
        checkoutCourier,
        checkoutPengiriman,
        subTotal,
        selectedShippingCost,
        discountVouchers
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${user.fullName}, (${user.phoneNumber}), ${user.address}, ${checkoutSubdistrict}, ${checkoutCity}, ${checkoutProvince}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        setPPN: `-`,
        shippingMethod: `${checkoutCourier}`,
        shippingCost: selectedShippingCost,
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

        // let dec = await Product.findOne({ where: { id: el.productId } });
        // if (dec && dec.stock >= el.quantity) {
        //   await dec.decrement("stock", { by: el.quantity, transaction: t });
        // } else {
        //   throw new Error('Produk tidak memiliki cukup stok.');
        // }
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

      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      let order_id = `INV/${currentDate}/IND/` +
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
        pajak,
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
        checkoutCourier,
        checkoutPengiriman,
        subTotal,
        selectedShippingCost,
        discountVouchers
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${user.fullName}, (${user.phoneNumber}), ${user.address}, ${checkoutSubdistrict}, ${checkoutCity}, ${checkoutProvince}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        setPPN: `${pajak}`,
        shippingMethod: `${checkoutCourier}`,
        shippingCost: selectedShippingCost,
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

        // let dec = await Product.findOne({ where: { id: el.productId } });
        // if (dec && dec.stock >= el.quantity) {
        //   await dec.decrement("stock", { by: el.quantity, transaction: t });
        // } else {
        //   throw new Error('Produk tidak memiliki cukup stok.');
        // }
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

      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      let order_id = `INV/${currentDate}/JUV/` +
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
        pajak,
        checkoutProvince,
        checkoutCity,
        bayar,
        checkoutSubdistrict,
        selectedVoucher,
        carts,
        checkoutCourier,
        checkoutPengiriman,
        subTotal,
        selectedShippingCost,
        discountVouchers
      } = req.body;

      const createCheckout = await Checkout.create({
        userId: req.user.id,
        shippingAddress: `${user.fullName}, (${user.phoneNumber}), ${user.address}, ${checkoutSubdistrict}, ${checkoutCity}, ${checkoutProvince}`,
        totalPrice: bayar,
        voucherCode: selectedVoucher,
        midtransCode: order_id,
        setPPN: `${pajak}`,
        shippingMethod: `${checkoutCourier}`,
        shippingCost: selectedShippingCost,
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

        // let dec = await Product.findOne({ where: { id: el.productId } });
        // if (dec && dec.stock >= el.quantity) {
        //   await dec.decrement("stock", { by: el.quantity, transaction: t });
        // } else {
        //   throw new Error('Produk tidak memiliki cukup stok.');
        // }
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

  // static async pay(req, res, next) {
  //   console.log(req.body, 'test pay');
  //   const vaNumbers = req.body.va_numbers;
  //   try {
  //     if (req.body.transaction_status === 'settlement') {
  //       await Checkout.update({
  //         paymentStatus: 'pay',
  //         paymentMethod: `VA Number: ${vaNumbers[0].va_number}, Bank: ${vaNumbers[0].bank}, Payment Type: ${req.body.payment_type}`
  //       }, {
  //         where: {
  //           midtransCode: req.body.order_id
  //         }
  //       })


  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async pay(req, res, next) {
    console.log(req.body, 'test pay');
    const vaNumbers = req.body.va_numbers;

    try {
      if (req.body.transaction_status === 'settlement') {
        // Menggunakan transaksi Sequelize
        await sequelize.transaction(async (t) => {
          // Ambil checkout yang sesuai dengan order_id
          const checkout = await Checkout.findOne({
            where: { midtransCode: req.body.order_id },
            transaction: t,
          });

          if (!checkout) {
            throw new Error('Data checkout tidak ditemukan');
          }

          // Ambil produk yang terkait
          const products = await CheckoutProduct.findAll({
            where: { checkoutId: checkout.id },
            transaction: t,
          });

          for (const product of products) {
            const productData = await Product.findByPk(product.productId, { transaction: t });
            if (productData && productData.stock >= product.quantity) {
              // Mengurangi stok produk
              await productData.decrement('stock', { by: product.quantity, transaction: t });
            } else {
              throw new Error('Produk tidak memiliki cukup stok.');
            }
          }

          // Update status pembayaran checkout
          await checkout.update(
            {
              paymentStatus: 'pay',
              paymentMethod: `${vaNumbers[0].bank}`,
            },
            { transaction: t }
          );
        });

        res.status(200).json({ message: 'Pembayaran berhasil diproses.' });
      } else {
        res.status(200).json({ message: 'Status transaksi tidak sesuai untuk pemrosesan pembayaran.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan dalam pemrosesan pembayaran.' });
    }
  }

}

module.exports = MidtransController;