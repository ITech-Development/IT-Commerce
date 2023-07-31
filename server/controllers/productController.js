
const { Product, ProductCategory, ProductType, User, SuperAdmin } = require('../models')

class ProductController {

    static async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: ProductCategory,
                        as: 'categories' // Nama asosiasi yang sama dengan yang didefinisikan di model Product
                    },
                    {
                        model: ProductType,
                        as: 'types'
                    },
                    
                ],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const newProduct = await Product.create({
                name: req.body.name,
                categoryId: req.body.categoryId,
                typeId: req.body.typeId,
                image: req.body.image,
                condition: req.body.condition,
                description: req.body.description,
                minimumOrder: req.body.minimumOrder,
                unitPrice: req.body.unitPrice,
                status: req.body.status,
                weight: req.body.weight,
                size: req.body.size,
                stock: req.body.stock,
                shippingInsurance: req.body.shippingInsurance,
                deliveryService: req.body.deliveryService,
                brand: req.body.brand,
                // voucherId: req.body.voucherId
            })
            res.status(201).json(newProduct)
        } catch (error) {
            console.log(error, 'hehehehhe');
            console.log(error);
        }
    }

    static async detailsProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.id
                },
                include: [
                    {
                        model: ProductCategory,
                        as: 'categories'
                    },
                    {
                        model: ProductType,
                        as: 'types'
                    }
                ]
            })
            if (product) {
                res.status(200).json(product)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                where: { id: req.params.id }
            })
            if (product) {
                await Product.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Product successfully deleted' })
            } else {
                throw { name: 'NotFoundError' };
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProduct(req, res, next) {
        try {
            const productId = req.params.id
            const {
                name,
                categoryId,
                typeId,
                image,
                condition,
                description,
                minimumOrder,
                unitPrice,
                status,
                stock,
                weight,
                size,
                shippingInsurance,
                deliveryService,
            } = req.body

            await Product.update({
                name,
                categoryId,
                typeId,
                image,
                condition,
                description,
                minimumOrder,
                unitPrice,
                status,
                stock,
                weight,
                size,
                shippingInsurance,
                deliveryService,
            },
                {
                    where: {
                        id: productId
                    }
                })
            res.status(201).json({ message: 'Edit successful' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController