const { Order } = require('../models')

class OrderController {
    
    static async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll()
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }

    static async addOrder(req, res, next) {
        try {
            console.log(req.body);
            const newOrder = await Order.create({
                userId: req.body.userId,
                transactionId: req.body.transactionId,
                productId: req.body.productId,
                qty: req.body.qty,
                totalPrice: req.body.totalPrice
            })
            res.status(201).json(newOrder)
        } catch (error) {
            next(error)
        }
    }


}

module.exports = OrderController