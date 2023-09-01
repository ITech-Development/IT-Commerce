const express = require('express')
const ProductCategoryController = require('../controllers/productCategoryController')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

// router.use(authentication)

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategory:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the productcategory
 *         name:
 *           type: string
 *           description: The productcategory name
 *         image:
 *           type: string
 *           description: The productcategory image
 *       example:
 *         id: 1
 *         name: example name
 *         image: examle image
 */

/**
 * @swagger
 * /product-categories:
 *   get:
 *     summary: Returns the list of all the product categories
 *     tags: [Product Categories]
 *     responses:
 *       200:
 *         description: The list of the product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductCategory'
 */
router.get('/', ProductCategoryController.getAllProductCategories)

/**
 * @swagger
 * /product-categories:
 *   post:
 *     summary: Create a new productcategory
 *     tags: [Product Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCategory'
 *     responses:
 *       200:
 *         description: The productcategory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       500:
 *         description: Error on the internal server
 */
router.post('/', ProductCategoryController.addProductCategory)

/**
 * @swagger
 * /product-categories/{id}:
 *   get:
 *     summary: Get the productcategory by id
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The productcategory id
 *     responses:
 *       200:
 *         description: The productcategory description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       404:
 *         description: The productcategory was not found
 */
router.get('/:id', ProductCategoryController.detailsProductCategory)

/**
 * @swagger
 * /product-categories/{id}:
 *   delete:
 *     summary: Remove the productcategory by id
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The productcategory id
 * 
 *     responses:
 *       200:
 *         description: Productcategory successfully deleted
 *       404:
 *         description: Products category not found
 */
router.delete('/:id', ProductCategoryController.deleteProductCategory)

/**
 * @swagger
 * /product-categories/{id}:
 *  put:
 *    summary: Update the productcategory by the id
 *    tags: [Product Categories]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The productcategory id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ProductCategory'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCategory'
 *      404:
 *        description: The productcategory was not found
 *      500:
 *        description: Error on the internal server
 */
router.put('/:id', ProductCategoryController.editProductCategory)

module.exports = router