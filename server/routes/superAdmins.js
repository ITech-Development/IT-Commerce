const express = require('express')
const SuperAdminController = require('../controllers/superAdminController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()


router.post('/register', SuperAdminController.registerSuperAdmin)
router.post('/login', SuperAdminController.loginSuperAdmin)
router.get('/transactions', authentication, SuperAdminController.getAllTransactions)

module.exports = router