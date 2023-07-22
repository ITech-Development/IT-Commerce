const { compare } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync(10);
const midtransClient = require("midtrans-client");
const axios = require("axios");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async registerUser(req, res, next) {
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
      if (req.body.password) {
        const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
      }
      let filename = null;
      try {
        filename = req.file.filename;
      } catch (error) {
        filename = req.body.imageProfile;
      }
      User.update(
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
            id: req.params.id,
          },
        }
      ).then((user) => {
        res.send({
          status: "success",
          data: {
            id: req.params.id,
          },
        });
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

  static async getCost(req, res, next) {
    try {
      let { courier } = req.query;
      console.log(courier);
      let destination = +req.query.destination;
      const obj = {
        origin: "291",
        destination,
        weight: 1000,
        courier,
      };
      const { data } = await axios({
        method: "POST",
        url: "https://api.rajaongkir.com/starter/cost",
        data: obj,
        headers: { key: "b2a87672564c42280e6666ad152083b6" },
      });
      res.status(200).json(data.rajaongkir.results[0].costs);
    } catch (error) {
      next(error);
    }
  }

  static async getProvince(req, res, next) {
    try {
      console.log('masuk');
      const province = await axios
        .get("https://api.rajaongkir.com/starter/province", {
          headers: { key: "b2a87672564c42280e6666ad152083b6" },
        })
        .then((response) => {
          return response.data.rajaongkir.results;
        })
        .catch((err) => {
          throw err;
        });
      res.status(200).json(province);
    } catch (error) {
      next(error);
    }
  }

  static async getCity(req, res, next) {
    try {
      const { id } = req.params;
      const city = await axios
        .get("https://api.rajaongkir.com/starter/city", {
          params: { province: id },
          headers: { key: "b2a87672564c42280e6666ad152083b6" },
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

  static async midtransToken(req, res, next) {
    try {
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
          gross_amount: 10000, //kalkulasikan total harga di sini
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
      res.status(201).json(midtransToken);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
