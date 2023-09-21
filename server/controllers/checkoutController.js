const { Checkout, User } = require("../models");

class CheckoutController {
  static async getAllCeckouts(req, res, next) {
    try {
      const checkouts = await Checkout.findAll({
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });
      res.status(200).json(checkouts);
    } catch (error) {
      next(error);
    }
  }

  static async addCeckout(req, res, next) {
    // const addCheckout = async (req, res) => {
    try {
      // Assuming the authenticated user ID is available in req.user.id (provided by the authentication middleware)
      const {
        firstName,
        lastName,
        contact,
        status,
        address,
        city,
        postalCode,
      } = req.body;
      const userId = req.user.id;

      // Create a new checkout record in the database
      const newCheckout = await Checkout.create({
        firstName,
        lastName,
        contact,
        status,
        address,
        city,
        postalCode,
        userId,
      });

      res.status(201).json({ success: true, data: newCheckout });
    } catch (error) {
      console.error("Error adding checkout:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add checkout." });
    }
    // };
  }

  static async detailsCeckout(req, res, next) {
    try {
      const checkout = await Checkout.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (checkout) {
        res.status(200).json(checkout);
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async editCeckout(req, res, next) {
    try {
      const checkoutId = req.params.id;
      const {
        fullName,
        phoneNumber,
        status,
        address,
        city,
        postalCode,
        userId,
      } = req.body;

      await Checkout.update(
        {
          fullName,
          phoneNumber,
          status,
          address,
          city,
          postalCode,
          userId,
        },
        {
          where: {
            id: checkoutId,
          },
        }
      );
      res.status(201).json({ message: "Edit successful" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCeckout(req, res, next) {
    try {
      const checkout = await Checkout.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (checkout) {
        await Checkout.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Checkout successfully deleted" });
      } else {
        throw { name: "NotFoundError" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CheckoutController;
