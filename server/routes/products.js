const express = require('express')
const ProductController = require('../controllers/productController')
const { authentication, authorization } = require('../middlewares/auth')
const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         category:
 *           $ref: '#/components/schemas/ProductCategory'
 *         type:
 *           $ref: '#/components/schemas/ProductType'
 *         image:
 *           type: string
 *           description: The product image
 *         condition:
 *           type: string
 *           description: The product condition
 *         description:
 *           type: string
 *           description: The product description
 *         minimumOrder:
 *           type: integer
 *           description: The product minimum order
 *         unitPrice:
 *           type: integer
 *           description: The product unit price
 *         status:
 *           type: string
 *           description: The product status
 *         stock:
 *           type: integer
 *           description: The product stock
 *         weight:
 *           type: integer
 *           description: The product weight
 *         size:
 *           type: integer
 *           description: The product size
 *         shippingInsurance:
 *           type: integer
 *           description: The product shippingInsurance
 *         deliveryService:
 *           type: string
 *           description: The product deliveryService
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     AccessTokenAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Access token with the Bearer scheme
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', ProductController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error on the internal server
 */
router.post('/', authentication, authorization,ProductController.addProduct)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Id not found
 */
router.get('/:id', ProductController.detailsProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 * 
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authentication, authorization, ProductController.deleteProduct)

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Error on the internal server
 */
router.put('/:id', authentication, authorization, ProductController.editProduct)

module.exports = router