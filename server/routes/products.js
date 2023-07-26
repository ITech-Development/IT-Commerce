const express = require('express')
const ProductController = require('../controllers/productController')
const { authentication, authorization, authenticationAdminSeller, authorizationAdminSeller } = require('../middlewares/auth')
const router = express.Router()

router.get('/', ProductController.getAllProducts);
router.post('/',
    authentication,
    authorization,
    ProductController.addProduct)
router.get('/:id', ProductController.detailsProduct)
router.delete('/:id',
    authentication,
    authorization,
    ProductController.deleteProduct)
router.put('/:id',
    authentication,
    authorization,
    ProductController.editProduct)

module.exports = router