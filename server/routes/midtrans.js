const express = require('express')
const { authenticationUser } = require('../middlewares/auth')
const MidtransController = require('../controllers/midtransController')
const router = express.Router()

router.use(authenticationUser)
router.post('/indo-riau', MidtransController.midtransTokenIndoRiau)
router.post('/juvindo', MidtransController.midtransTokenJuvindo)

module.exports = router