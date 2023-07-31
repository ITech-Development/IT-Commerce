const express = require('express')
const UserController = require('../controllers/userController')
const { authentication, authenticationUser, authenticationAdminSeller, authorization } = require('../middlewares/auth')
const router = express.Router()

router.get('/', authenticationUser, UserController.getAllUsers)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.post('/google', UserController.googleLogin)
router.post('/midtrans', authenticationUser, UserController.midtransToken)
router.post('/pay', authenticationUser, UserController.pay)
router.get('/cost', authenticationUser, UserController.getCost)
router.get('/province', authenticationUser, UserController.getProvince)
router.get('/city/:id', authenticationUser, UserController.getCity)

router.delete('/:id', authentication, authorization, UserController.deleteUser)
router.get('/:id', authenticationUser, UserController.detailsUser)
router.put('/:id', authenticationUser, UserController.updateUser)


module.exports = router