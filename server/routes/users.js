const express = require('express')
const UserController = require('../controllers/userController')
const { authentication, authenticationUser, authenticationAdminSeller, authorization } = require('../middlewares/auth')
const router = express.Router()

router.get('/', authenticationUser, UserController.getAllUsers)
router.get('/me', authenticationUser, UserController.getMeById)
router.put('/me', authenticationUser, UserController.editUser);

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.post('/google', UserController.googleLogin)
router.post('/midtrans', authenticationUser, UserController.midtransToken)
router.post('/pay', authenticationUser, UserController.pay)
router.get('/cost', authenticationUser, UserController.getCost)
router.get('/province', authenticationUser, UserController.getProvince)
router.get('/city/:id', authenticationUser, UserController.getCity)
router.get('/subdistrict/:id', authenticationUser, UserController.getSubdistrict)

router.delete('/:id', authentication, authorization, UserController.deleteUser)
router.get('/:id', authenticationUser, UserController.detailsUser)
router.put('/:id', authenticationUser, UserController.updateUser)


module.exports = router