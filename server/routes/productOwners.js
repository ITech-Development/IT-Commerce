const express = require('express');
const { authenticationUser } = require('../middlewares/auth');
const ProductOwnerController = require('../controllers/productOwnerController');
const router = express.Router()

router.get('/', ProductOwnerController.getAllProductOwners);
router.post('/', ProductOwnerController.addProductOwner);
router.get('/:id', ProductOwnerController.detailsProductOwner);
router.delete('/:id', ProductOwnerController.deleteProductOwner);
router.put('/:id', ProductOwnerController.editProductOwner);

module.exports = router