const { compare } = require("../helpers/bcryptjs");
const { SuperAdmin } = require("../models");
const { createToken } = require("../helpers/jwt");

class SuperAdminController {
  static async registerSuperAdmin(req, res, next) {
    try {
      const { email, password, fullName, phoneNumber, address, imageProfile } =
        req.body;
      const superAdmin = await SuperAdmin.create({
        email,
        password,
        fullName,
        role: "superAdmin",
        phoneNumber,
        address,
        imageProfile,
      });
      res.status(201).json({ superAdmin });
    } catch (error) {
      next(error);
    }
  }

  static async loginSuperAdmin(req, res, next) {
    try {
      const { email, password } = req.body;
      const superAdmin = await SuperAdmin.findOne({
        where: { email },
      });
      if (!superAdmin) {
        throw { name: "InvalidCredentials" };
      } else {
        const compareResult = compare(password, superAdmin.password);
        if (!compareResult) {
          throw { name: "InvalidCredentials" };
        } else {
          const { id, email, role } = superAdmin;
          const access_token = createToken({
            id,
            email,
            role,
          });
          res.status(200).json({
            access_token,
            fullName: superAdmin.fullName,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SuperAdminController;
