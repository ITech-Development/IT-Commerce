const express = require('express')
const UserController = require('../controllers/userController')
const { authentication, authenticationUser } = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         phoneNumber:
 *           type: string
 *           description: The first name of the user
 *         address:
 *           type: string
 *           description: The last name of the user
 *       example:
 *         id: 1
 *         fullName: john doe
 *         email: john.doe@example.com
 *         password: password
 *         phoneNumber: 0896
 *         address: pekanbaru
 *         imageProfile: image
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', authenticationUser,UserController.getAllUsers)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Invalid user data.
 *       500:
 *         description: Internal server error
 */

router.post('/register', UserController.registerUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Invalid login data.
 *       500:
 *         description: Internal server error
 */

router.post('/login', UserController.loginUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', UserController.deleteUser)
router.get('/:id',authenticationUser, UserController.detailsUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Updated user object
 *         schema:
 *           type: object
 *           properties:
 *             fullName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             address:
 *               type: string
 *             imageProfile:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticationUser, UserController.updateUser)
router.post('/google', UserController.googleLogin)

router.post('/midtrans', authenticationUser, UserController.midtransToken)
router.post('/pay', authenticationUser, UserController.pay)
router.get('/cost', authenticationUser, UserController.getCost)
router.get('/province', authenticationUser, UserController.getProvince)
router.get('/city/:id', authenticationUser, UserController.getCity)

module.exports = router