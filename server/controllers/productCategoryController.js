const { ProductCategory, ProductType, Product } = require('../models')

class ProductCategoryController {

    static async addProductCategory(req, res, next) {
        try {
            const newCategory = await ProductCategory.create({
                name: req.body.name,
                image: req.body.image
            })
            res.status(201).json(newCategory)
        } catch (error) {
            next(error)
        }
    }

    static async getAllProductCategories(req, res, next) {
        try {
            const productCategories = await ProductCategory.findAll({
                include: [
                    {
                        model: ProductType,
                        as: 'types',
                        include: [
                            {
                                model: Product,
                                as: 'products'
                            }
                        ]
                    }
                ]
            })
            res.status(200).json(productCategories)
        } catch (error) {
            next(error)
        }
    }


    static async detailsProductCategory(req, res, next) {
        try {
            const productCategory = await ProductCategory.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (productCategory) {
                res.status(200).json(productCategory)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteProductCategory(req, res, next) {
        try {
            const productCategory = await ProductCategory.findOne({
                where: { id: req.params.id }
            })
            if (productCategory) {
                await ProductCategory.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Product category successfully deleted' })
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editProductCategory(req, res, next) {
        try {
            const productCategoryId = req.params.id
            const {
                name,
                image
            } = req.body

            await ProductCategory.update({
                name,
                image
            }, {
                where: {
                    id: productCategoryId
                }
            })
            res.status(201).json({ message: 'Edit successful' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductCategoryController