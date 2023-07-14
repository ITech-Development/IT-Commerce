const express = require('express')
const ProductCartController = require('../controllers/productCartController')
const router = express.Router()

router.get('/', ProductCartController.getAllProductCarts)
router.post('/', ProductCartController.addProductCart)

module.exports = router