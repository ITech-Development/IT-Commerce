const express = require('express')
const TransactionController = require('../controllers/transactionController')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - userId
 *         - status
 *         - totalPrice
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the order
 *         userId:
 *           type: integer
 *           description: The order userId
 *         status:
 *           type: string
 *           description: The order category id
 *         totalPrice:
 *           type: integer
 *           description: The order type id
 *         image:
 *           type: string
 *           description: The order image
 *       example:
 *         id: 1
 *         userId: 1
 *         status: status
 *         totalPrice: 10000
 *         image: image product
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Returns the list of all the transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: The list of the transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
router.get('/', TransactionController.getAllTransactions)

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Error on the internal server
 */
router.post('/', TransactionController.addTransaction)

/**
 * @swagger
 * /transactions/{userId}:
 *   get:
 *     summary: Get the product by user id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction user id
 *     responses:
 *       200:
 *         description: The transaction description by user id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: User id not found
 */
router.get('/:userId', TransactionController.detailsTransactionUserId)

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: The transaction description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Id not found
 */
router.get('/:id', TransactionController.detailsTransaction)

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Remove the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 * 
 *     responses:
 *       200:
 *         description: Transaction successfully deleted
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', TransactionController.deleteTransaction)

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update the status of the transaction by id
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *       - in: body
 *         name: transaction
 *         description: Updated transaction object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               description: The updated status of the transaction
 * 
 *     responses:
 *       200:
 *         description: Transaction status successfully updated
 *       404:
 *         description: Transaction not found
 */
router.patch('/:id', TransactionController.updateTransaction)


module.exports = router