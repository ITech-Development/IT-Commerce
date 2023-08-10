const { compare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User, Profile, Checkout, CheckoutProduct, Product } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const bcryptjs = require("bcryptjs");
const helpers = require('../helpers/index')
const salt = bcryptjs.genSaltSync(10);
const midtransClient = require("midtrans-client");
const axios = require("axios");
let { sequelize } = require("../models/");
const rajaOngkir = process.env.RAJAONGKIR_API_KEY;

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getMeById(req,res, next) {
    try {
      const profiles = await User.findOne({
        where: { id: req.user.id }
      })
      res.status(200).json(profiles)
    } catch (error) {
      next(error)
    }
  }

  static async editUser(req, res, next) {
    const { fullName, email, phoneNumber, address } = req.body;
  
    try {
      // Dapatkan pengguna yang akan diedit berdasarkan ID pengguna yang terautentikasi
      const user = await User.findByPk(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update informasi pengguna dengan nilai-nilai baru
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
  
      // Simpan perubahan informasi pengguna ke database
      await user.save();
  
      res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
      console.log(error, 'roar');
      next(error);
    }
  }

  static async detailsUser(req, res, next) {
    try {
      const authenticatedUserId = req.user.id;
      const requestedUserId = +req.params.id;

      if (authenticatedUserId !== requestedUserId) {
        return res.status(403).send({
          status: "error",
          message: "You are not authorized to update this user's data.",
        });
      }

      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })

      if (user) {
        res.status(200).json(user)
      } else {
        throw { name: 'NotFoundError' }
      }
    } catch (error) {
      next(error)
    }
  }

  static async registerUser(req, res, next) {
    // try {
    //   let { email, password, fullName, phoneNumber, address, imageProfile } =
    //     req.body;

    //   let user = await User.create({
    //     email,
    //     password,
    //     fullName,
    //     role: "user",
    //     phoneNumber,
    //     address,
    //     imageProfile,
    //   });
    //   res.status(201).json({ user });
    // } catch (error) {
    //   next(error);
    // }

    try {
      let { email, password, fullName, phoneNumber, address, imageProfile } =
        req.body;

      let user = await User.create({
        email,
        password,
        fullName,
        role: "user",
        phoneNumber,
        address,
        imageProfile,
      });

      await Profile.create({
        userId: user.id,
      })

      res.status(201).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "InvalidCredentials" };
      } else {
        let compareResult = compare(password, user.password);
        if (!compareResult) {
          throw { name: "InvalidCredentials" };
        } else {
          const { id, email, role } = user;
          let access_token = createToken({
            id,
            email,
            role,
          });
          res.status(200).json({
            access_token,
            fullName: user.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const authenticatedUserId = req.user.id;
      const requestedUserId = +req.params.id;

      if (authenticatedUserId !== requestedUserId) {
        return res.status(403).send({
          status: "error",
          message: "You are not authorized to update this user's data.",
        });
      }

      if (req.body.password) {
        req.body.password = hashPassword(req.body.password);
      }

      let filename = null;
      try {
        filename = req.file.filename;
      } catch (error) {
        filename = req.body.imageProfile;
      }

      await User.update(
        {
          email: req.body.email,
          password: req.body.password,
          fullName: req.body.fullName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          imageProfile: filename,
        },
        {
          where: {
            id: requestedUserId,
          },
        }
      );

      res.send({
        status: "success",
        data: {
          id: requestedUserId,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email, name } = payload;
      const [user, create] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          fullName: name,
          email,
          password: "justbefree",
          role: "User",
        },
        hooks: false,
      });
      const access_token = createToken({
        id: user.id,
      });
      res.status(200).json({ access_token, fullName: user.fullName });
    } catch (error) {
      next(error);
    }
  }

  static async getProvince(req, res, next) {
    try {
      console.log('masuk');
      const province = await axios
        .get("https://pro.rajaongkir.com/api/province", {
          headers: { key: rajaOngkir },
        })
        .then((response) => {
          console.log('masuk oioioi');
          return response.data.rajaongkir.results;
        })
        .catch((err) => {
          throw err;
        });
      res.status(200).json(province);
    } catch (error) {
      console.log(error, 'dari get province');
      next(error);
    }
  }



  static async getCity(req, res, next) {
    try {
      const { id } = req.params;
      const city = await axios
        .get("https://pro.rajaongkir.com/api/city", {
          params: { province: id },
          headers: { key: rajaOngkir },
        })
        .then((response) => {
          return response.data.rajaongkir.results;
        })
        .catch((err) => {
          throw err;
        });
      res.status(200).json({ data: city });
    } catch (error) {
      next(error);
    }
  }

  static async getSubdistrict(req, res, next) {
    try {
      const { id } = req.params;
      const city = await axios
        .get("https://pro.rajaongkir.com/api/subdistrict", {
          params: { city: id },
          headers: { key: rajaOngkir },
        })
        .then((response) => {
          return response.data.rajaongkir.results;
        })
        .catch((err) => {
          throw err;
        });
      res.status(200).json({ data: city });
    } catch (error) {
      next(error);
    }
  }

  static async getCost(req, res, next) {
    try {
      let { courier } = req.query;
      let destination = +req.query.destination;
      let weight = +req.query.weight;
      const obj = {
        origin: "351",
        originType: 'city',
        destination,
        destinationType: 'subdistrict',
        weight,
        courier,
      };
      const { data } = await axios({
        method: "POST",
        url: "https://pro.rajaongkir.com/api/cost",
        data: obj,
        headers: { key: rajaOngkir },
      });
      res.status(200).json(data.rajaongkir.results[0].costs);
    } catch (error) {
      next(error);
    }
  }

  static async midtransToken(req, res, next) {
    const t = await sequelize.transaction();
    // console.log(req.user.id);
    try {
      let temp = []
      const user = await User.findByPk(req.user.id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-ZQU4wWb0ZkWhko2QA8_bZZGZ",
      });

      let parameter = {
        transaction_details: {
          order_id:
            "INDOTEKNIK-ORDERID-" +
            Math.floor(1000000 + Math.random() * 9000000), //harus unique
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
        midtransCode: midtransToken.token,
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
        console.log(dec.stock, 'dec quantityyyyyyy');
        console.log(el.quantity, 'el quantityyyyyyy');
        if (dec && dec.stock > el.quantity) {
          await dec.decrement("stock", { by: el.quantity, transaction: t });
        } else {
          console.log('erorrrrrrrrrrrrrr');
          throw ({ message: 'Data yang anda minta tidak atau terlalu banyak dari stok produk' })
        }
      })
      await CheckoutProduct.create({
        checkoutId: createCheckout.id,
        productId: 10,
        quantity: 1,
        transaction: t
      })
      // console.log(temp, 'cartsmidtransssssssssssss');
      let bulkCreate = await CheckoutProduct.bulkCreate(temp, { transaction: t })
      console.log(bulkCreate, 'bulkkkkkkkkkkkkkkkkkkkkkk');
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

    } catch (error) {

    }
  }
}

module.exports = UserController;
