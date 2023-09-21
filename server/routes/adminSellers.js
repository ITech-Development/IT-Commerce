const express = require('express')
const AdminSellerController = require('../controllers/adminSellerController')
const { authenticationAdminSeller } = require('../middlewares/auth')
const router = express.Router()

router.get('/', AdminSellerController.getAllAdminSellers)
router.get('/voucher', AdminSellerController.getAllProductsByVoucherCode)
router.get('/order-list', AdminSellerController.getOrderListByVoucherCode)
router.post('/register', AdminSellerController.registerAdminSeller)
router.post('/login', AdminSellerController.loginAdminSeller)
router.put('/:id', AdminSellerController.updateAdminSeller)
router.delete('/:id', AdminSellerController.deleteAdminSeller)

module.exports = router