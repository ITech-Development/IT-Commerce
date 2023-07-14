const { ProductCart } = require('../models')

class ProductCartController {

    static async getAllProductCarts(req, res, next) {
        try {
            const productCarts = await ProductCart.findAll()
            res.status(200).json(productCarts)
        } catch (error) {
            next(error)
        }
    }

    static async addProductCart(req, res, next) {
        try {
            const { cartId, productId } = req.body
            const newProductCart = await ProductCart.create({
                cartId, productId
            })
            res.status(201).json(newProductCart)
        } catch (error) {
            next(error)
        }
    }

    
}
module.exports = ProductCartController