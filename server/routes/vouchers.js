const express = require('express')
const VoucherController = require('../controllers/voucherController')
const router = express.Router()

router.get('/', VoucherController.getAllVouchers)
router.post('/', VoucherController.addVoucher)
router.get('/:id', VoucherController.detailsVoucher)
router.put('/:id', VoucherController.editVoucher)
router.delete('/:id', VoucherController.deleteVoucher)

module.exports = router