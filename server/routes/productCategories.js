const express = require('express')
const ProductCategoryController = require('../controllers/productCategoryController')
const { authenticationWarehouseAdmin, authorizationWarehouseAdmin } = require('../middlewares/auth')
const bodyParser = require('body-parser');
const router = express.Router()
const multer = require('multer');
const fileStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + '-' + file.originalname)
        }
    }
); // Tentukan folder tujuan untuk menyimpan file yang diunggah

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const maxSize = 3 * 1024 * 1024 // 3 MB, sesuaikan dengan batas yang Anda inginkan

router.use(bodyParser.json());
router.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize // Batas ukuran berkas
    }
}).single('image'))

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Kesalahan dari multer (misalnya, ukuran berkas terlalu besar)
        res.status(400).json({ error: 'File size is too large' });
    } else {
        // Kesalahan lain
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
});

router.get('/', ProductCategoryController.getAllProductCategories)
router.post('/', authenticationWarehouseAdmin, authorizationWarehouseAdmin, ProductCategoryController.addProductCategory)
router.get('/:id', ProductCategoryController.detailsProductCategory)
router.delete('/:id', ProductCategoryController.deleteProductCategory)
router.put('/:id', authenticationWarehouseAdmin, authorizationWarehouseAdmin, ProductCategoryController.editProductCategory)

module.exports = router