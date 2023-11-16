const { EventProduct, Product, Event } = require('../models')

class EventProductController {

    static async getAllEventProducts(req, res, next) {
        try {
            const eventProducts = await EventProduct.findAll({
            })
            res.status(200).json(eventProducts)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addEventProduct(req, res, next) {
        try {
            const { id } = req.params
            const findProduct = await Product.findByPk(id)
            if (!findProduct) {
                throw {
                    message: 'Not found product'
                }
            }

            const eventProduct = await eventProduct.create({
                userId: req.user.id,
                productId: id
            })

            res.status(201).json({
                message: 'Added event product successfuly',
                eventProduct: eventProduct
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteEventProduct(req, res, next) {
        const id = req.params.id;
        try {
            const eventProduct = await EventProduct.findOne({ where: { id } });
            if (!eventProduct) {
                res.status(404).json({ message: "Product not found in event product" });
            }

            const product = await Product.findOne({
                where: { id: eventProduct.productId },
            });
            if (product) {

                await eventProduct.destroy();
                
                return res.status(200).json({ message: "Product removed from event product" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            console.log(error, "remooooove");
            next(error);
        }
    }

}

module.exports = { EventProductController }