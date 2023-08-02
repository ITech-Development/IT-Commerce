const express = require('express')
const ProductController = require('../controllers/productController')
const { authorizationWarehouseAdmin, authenticationWarehouseAdmin } = require('../middlewares/auth')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Tentukan folder tujuan untuk menyimpan file yang diunggah

router.get('/', ProductController.getAllProducts);
router.post('/',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    upload.single('image'),
    ProductController.addProduct)
router.get('/:id', ProductController.detailsProduct)
router.delete('/:id',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    ProductController.deleteProduct)
router.put('/:id',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin,
    ProductController.editProduct)

module.exports = router