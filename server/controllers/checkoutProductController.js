const { CheckoutProduct, Checkout, sequelize } = require('../models')

class CheckoutProductController {

    static async getAllCheckoutProducts(req, res, next) {
        try {
            const checkoutProduct = await CheckoutProduct.findAll()
            res.status(200).json(checkoutProduct)
        } catch (error) {
            next(error)
        }
    }

    static async addCheckoutProduct(req, res, next) {
        const t = await sequelize.transaction();
        const { id } = req.body;
        try {
            let findedCheckout = await Checkout.findOne({ where: { userId: req.user.id } });
            let idTemp;

            if (!findedCheckout) {
                let cretedCheckout = await Checkout.create({ userId: req.user.id }, { transaction: t });
                idTemp = cretedCheckout.id;
            } else {
                idTemp = findedCheckout.id;
            }

            let checkCheckoutProduct = await CheckoutProduct.findOne({
                where: {
                    checkoutId: idTemp,
                    productId: id,
                },
            });

            if (checkCheckoutProduct) {
                await checkCheckoutProduct.increment("quantity", { by: 1, transaction: t });
            } else {
                await CheckoutProduct.create({
                    checkoutId: idTemp,
                    productId: id,
                    quantity: 1,
                }, { transaction: t });
            }

            let findedProduct = await Product.findOne({ where: { id } });
            await findedProduct.decrement("stock", { by: 1, transaction: t });
        } catch (error) {

        }
        // try {
        //     const {
        //         checkoutId,
        //         productId,
        //         quantity
        //     } = req.body

        //     const newCheckoutProduct = await CheckoutProduct.create({
        //         checkoutId,
        //         productId,
        //         quantity
        //     })
        //     res.status(201).json(newCheckoutProduct)
        // } catch (error) {
        //     console.log(error);
        //     next(error)
        // }
    }

    static async detailsCheckoutProduct(req, res, next) {
        try {
            const checkoutProduct = await CheckoutProduct.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (checkoutProduct) {
                res.status(200).json(checkoutProduct)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }



}

module.exports = CheckoutProductController