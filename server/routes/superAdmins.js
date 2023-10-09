const express = require('express')
const SuperAdminController = require('../controllers/superAdminController')
const router = express.Router()


router.post('/register', SuperAdminController.registerSuperAdmin)
router.post('/login', SuperAdminController.loginSuperAdmin)

module.exports = router