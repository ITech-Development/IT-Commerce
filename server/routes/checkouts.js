const express = require('express')
const CheckoutController = require('../controllers/checkoutController')
const { authenticationUser } = require('../middlewares/auth')

const router = express.Router()

router.get('/', CheckoutController.getAllCeckouts)
router.post('/', authenticationUser, CheckoutController.addCeckout)
router.get('/:id', CheckoutController.detailsCeckout)
router.put('/:id', CheckoutController.editCeckout)
router.delete('/:id', CheckoutController.deleteCeckout)

module.exports = router
