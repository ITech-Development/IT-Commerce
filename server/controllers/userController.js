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

  static async getMeById(req, res, next) {
    try {
      const profile = await User.findOne({
        where: { id: req.user.id }
      })
      res.status(200).json(profile)
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
    console.log(req.body);
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




  static async getProvince(req, res, next) {
    try {
      const province = await axios
        .get("https://pro.rajaongkir.com/api/province", {
          headers: { key: rajaOngkir },
        })
        .then((response) => {
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


  
}

module.exports = UserController;
