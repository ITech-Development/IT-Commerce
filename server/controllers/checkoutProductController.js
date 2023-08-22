const { CheckoutProduct, Checkout, Product, sequelize } = require('../models')

class CheckoutProductController {
    // static async getAllCheckoutProducts(req, res, next) {
    //     try {
    //         let findedCheckout = await Checkout.findOne({
    //             where: { userId: req.user.id },
    //         });
    //         let userId = findedCheckout.userId;
    //         const checkoutProduct = await CheckoutProduct.findAll({
    //             include: [
    //                 {
    //                     model: Checkout,
    //                     as: 'checkouts',
    //                     where: {
    //                         userId: userId // Filter berdasarkan userId
    //                     }
    //                 },
    //                 {
    //                     model: Product,
    //                     as: 'products'
    //                 },
    //             ]
    //         })
    //         res.status(200).json(checkoutProduct)
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async getAllCheckoutProducts(req, res, next) {
        try {
            // Find the checkout associated with the user
            const findedCheckout = await Checkout.findOne({
                where: { userId: req.user.id },
            });
    
            // Get the user's ID from the found checkout
            const userId = findedCheckout.userId;
    
            // Retrieve checkout products and include associated checkout and product data
            const checkoutProducts = await CheckoutProduct.findAll({
                include: [
                    {
                        model: Checkout,  // Include Checkout model
                        as: 'checkouts',  // Define alias for the association
                        where: {
                            userId: userId // Filter checkouts by user ID
                        }
                    },
                    {
                        model: Product,   // Include Product model
                        as: 'products'    // Define alias for the association
                    },
                ]
            });
    
            // Group checkout products by checkout ID
            const groupedProducts = {}; // Initialize an object to store grouped products
            checkoutProducts.forEach(product => {
                const checkoutId = product.checkouts.id; // Get the checkout ID
                if (!groupedProducts[checkoutId]) {
                    groupedProducts[checkoutId] = []; // Initialize an array for the checkout ID
                }
                groupedProducts[checkoutId].push(product.products); // Push the product to the array
            });
    
            res.status(200).json(groupedProducts);
        } catch (error) {
            next(error);
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