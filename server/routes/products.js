const express = require('express')
const ProductController = require('../controllers/productController')
const bodyParser = require('body-parser'); // Tambahkan ini
const { authorizationWarehouseAdmin, authenticationWarehouseAdmin } = require('../middlewares/auth')
const router = express.Router()
const multer = require('multer');
const path = require('path')
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

router.use(bodyParser.json());
// router.use('/images', express.static(path.join(__dirname, 'images')));
// router.use('/uploads', express.static('uploads'));
router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),)

router.get('/', ProductController.getAllProducts);
router.post('/',
    authenticationWarehouseAdmin,
    authorizationWarehouseAdmin, 
    // '/images', express.static(path.join(__dirname, '..', 'images')),
    // multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),
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