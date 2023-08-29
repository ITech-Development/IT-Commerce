const express = require('express')
const AdminSellerController = require('../controllers/adminSellerController')
const router = express.Router()


router.get('/', AdminSellerController.getAllAdminSellers)
router.get('/voucher', AdminSellerController.getAllProductsByVoucherCode)
router.post('/register', AdminSellerController.registerAdminSeller)
router.post('/login', AdminSellerController.loginAdminSeller)
router.put('/:id', AdminSellerController.updateAdminSeller)

module.exports = router