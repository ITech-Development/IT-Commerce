const { Order, Product } = require('../models')

class OrderController {

    static async getAllOrders(req, res, next) {
        try {
            const orders = await Order.findAll()
            res.status(200).json(orders)
        } catch (error) {
            console.log(error, 'order error.....');
            next(error)
        }
    }

    static async addOrder(req, res, next) {
        // try {
        console.log(req.params, 'params eiiii');
        // console.log(req.body, 'orderrrrrrrrrrrrrrrrrrrrrrrr');
        //     const newOrder = await Order.create({
        //         userId: req.body.userId,
        //         transactionId: req.body.transactionId,
        //         productId: req.body.productId,
        //         qty: req.body.qty,
        //         totalPrice: req.body.totalPrice
        //     })
        //     res.status(201).json(newOrder)
        // } catch (error) {
        //     console.log(error, 'errorrr....');
        //     next(error)
        // }

        try {
            let { id } = req.params
            let findData = await Product.findByPk(id)
            if (!findData) {
                throw {
                    message: 'Not Found Product'
                }
            }
            let user_id = req.user.id
            let createCart = await Order.create({
                userId: user_id,
                // transactionId: req.body.transactionId,
                productId: id,
                qty: req.body.qty,
                totalPrice: req.body.qty
            })
            res.status(201).json(createCart)
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = OrderController