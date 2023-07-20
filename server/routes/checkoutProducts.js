const express = require('express')
const CheckoutProductController = require('../controllers/checkoutProductController')
const { authenticationUser } = require('../middlewares/auth')
const router = express.Router()

router.get('/', authenticationUser, CheckoutProductController.getAllCheckoutProducts)
router.post('/', authenticationUser, CheckoutProductController.addCheckoutProduct)
router.get('/:id', CheckoutProductController.detailsCheckoutProduct)
// router.delete('/:id', ProductShippingController.deleteProductShipping)

module.exports = router
