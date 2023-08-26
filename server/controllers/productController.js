
const { Product, ProductCategory, ProductType, User, SuperAdmin, ProductOwner, WarehouseAdmin } = require('../models')
const { validationResult } = require('express-validator')
const baseUrl = 'http://localhost:3100'; // Ubah dengan URL server Anda

class ProductController {

    static async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll(
                {
                    include: [
                        {
                            model: ProductCategory,
                            as: 'categories',
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
                }
            );
            res.status(200).json(products);
        } catch (error) {
            console.log(error, 'form all product');
            next(error);
        }
    }

    static async getNozzelCategory(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 1 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }
    static async getDeliveryValve(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 2 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }

    static async getElementCategory(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 3 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }

    static async getVEPumpCategory(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 4 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }

    static async getVEPumpPartsCategory(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 5 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }

    static async getHeadRotorCategory(req, res, next) {
        try {
            const one = await Product.findAll({
                where: { categoryId: 6 },
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(one);
        } catch (error) {
            next(error);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const err = new Error('Input values ​​dont match')
                err.errorStatus = 400
                err.data = errors.array()
                throw err
            }

            if (!req.file) {
                const err = new Error('Image must be uploaded')
                err.errorStatus = 422
                throw err
            }

            const newProduct = await Product.create({
                name: req.body.name,
                categoryId: req.body.categoryId,
                typeId: req.body.typeId,
                image: req.file.path.replace('\\', '/'), // Ubah path menjadi URL relatif
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

    // static async editProduct(req, res, next) {
    //     try {
    //         const productId = req.params.id


    //         await Product.update({
    //             name: req.body.name,
    //             categoryId: req.body.categoryId,
    //             typeId: req.body.typeId,
    //             image: req.body.image,
    //             description: req.body.description,
    //             minimumOrder: req.body.minimumOrder,
    //             unitPrice: req.body.unitPrice,
    //             weight: req.body.weight,
    //             height: req.body.height,
    //             width: req.body.width,
    //             stock: req.body.stock,
    //             productOwnerId: req.body.productOwnerId,
    //             authorId: req.warehouseAdmin.id,
    //         },
    //             {
    //                 where: {
    //                     id: productId
    //                 }
    //             })
    //         res.status(201).json({ message: 'Edit successful' })
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async editProduct(req, res, next) {
        try {
            const productId = req.params.id; // Get the product ID from the URL parameter

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = new Error('Input values ​​dont match');
                err.errorStatus = 400;
                err.data = errors.array();
                throw err;
            }

            const existingProduct = await Product.findByPk(productId);
            if (!existingProduct) {
                const err = new Error('Product not found');
                err.errorStatus = 404;
                throw err;
            }

            // Update the product's properties based on request body
            existingProduct.name = req.body.name;
            existingProduct.categoryId = req.body.categoryId;
            existingProduct.typeId = req.body.typeId;
            existingProduct.description = req.body.description;
            existingProduct.minimumOrder = req.body.minimumOrder;
            existingProduct.unitPrice = req.body.unitPrice;
            existingProduct.weight = req.body.weight;
            existingProduct.height = req.body.height;
            existingProduct.width = req.body.width;
            existingProduct.stock = req.body.stock;

            if (req.file) {
                // Update the image path if a new image is uploaded
                existingProduct.image = req.file.path.replace('\\', '/');
            }

            // Save the updated product
            await existingProduct.save();

            res.status(200).json(existingProduct);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

module.exports = ProductController