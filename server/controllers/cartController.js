const { Cart, Product } = require('../models')

class CartController {

    static async getAllCarts(req, res, next) {
        try {
            const carts = await Cart.findAll()
            res.status(200).json(carts)
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        try {
            let user_id = req.user.id
            let createCart = await Cart.create({
                userId: user_id,
            })
            res.status(201).json(createCart)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CartController