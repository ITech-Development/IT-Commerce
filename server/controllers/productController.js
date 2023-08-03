
const { Product, ProductCategory, ProductType, User, SuperAdmin, ProductOwner, WarehouseAdmin } = require('../models')
const { validationResult } = require('express-validator')


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
                    {
                        model: ProductOwner,
                        as: 'product_owners'
                    },
                    {
                        model: WarehouseAdmin,
                        as: 'authors'
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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const err = new Error('Input value tidak sesuai')
                err.errorStatus = 400
                err.data = errors.array()
                throw err
            }

            if (!req.file) {
                const err = new Error('Image harus diupload')
                err.errorStatus = 422
                throw err
            }

            const newProduct = await Product.create({
                name: req.body.name,
                categoryId: req.body.categoryId,
                typeId: req.body.typeId,
                image: req.file.path,
                description: req.body.description,
                minimumOrder: req.body.minimumOrder,
                unitPrice: req.body.unitPrice,
                weight: req.body.weight,
                height: req.body.height,
                width: req.body.width,
                stock: req.body.stock,
                productOwnerId: req.body.productOwnerId,
                authorId: req.warehouseAdmin.id,
            })
            res.status(201).json(newProduct)
        } catch (error) {
            console.log(error);
            next(error)
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


            await Product.update({
                name: req.body.name,
                categoryId: req.body.categoryId,
                typeId: req.body.typeId,
                image: req.body.image,
                description: req.body.description,
                minimumOrder: req.body.minimumOrder,
                unitPrice: req.body.unitPrice,
                weight: req.body.weight,
                height: req.body.height,
                width: req.body.width,
                stock: req.body.stock,
                productOwnerId: req.body.productOwnerId,
                authorId: req.warehouseAdmin.id,
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