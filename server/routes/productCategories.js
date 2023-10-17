const express = require('express')
const ProductCategoryController = require('../controllers/productCategoryController')
const { authenticationWarehouseAdmin, authorizationWarehouseAdmin } = require('../middlewares/auth')
const router = express.Router()

router.get('/', ProductCategoryController.getAllProductCategories)
router.post('/', authenticationWarehouseAdmin, authorizationWarehouseAdmin, ProductCategoryController.addProductCategory)
router.get('/:id', ProductCategoryController.detailsProductCategory)
router.delete('/:id', ProductCategoryController.deleteProductCategory)
router.put('/:id', ProductCategoryController.editProductCategory)

module.exports = router