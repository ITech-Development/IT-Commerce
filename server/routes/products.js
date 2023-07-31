const express = require('express')
const ProductController = require('../controllers/productController')
const { authentication, authorization, authenticationAdminSeller, authorizationAdminSeller } = require('../middlewares/auth')
const router = express.Router()

router.get('/', ProductController.getAllProducts);
router.post('/',
    authenticationAdminSeller,
    authorizationAdminSeller,
    ProductController.addProduct)
router.get('/:id', ProductController.detailsProduct)
router.delete('/:id',
    authenticationAdminSeller,
    authorizationAdminSeller,
    ProductController.deleteProduct)
router.put('/:id',
    authenticationAdminSeller,
    authorizationAdminSeller,
    ProductController.editProduct)

module.exports = router