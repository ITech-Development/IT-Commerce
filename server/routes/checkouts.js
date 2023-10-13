const express = require('express')
const CheckoutController = require('../controllers/checkoutController')
const { authenticationUser, authenticationAdminSeller } = require('../middlewares/auth')

const router = express.Router()

router.get('/', CheckoutController.getAllCheckouts)
router.post('/', authenticationUser, CheckoutController.addCheckout)
router.get('/:id', CheckoutController.detailsCheckout)
router.put('/:id', authenticationAdminSeller, authenticationUser,CheckoutController.editCheckout)
router.delete('/:id', CheckoutController.deleteCheckout)

module.exports = router