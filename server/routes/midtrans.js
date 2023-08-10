const express = require('express');
const { authenticationUser } = require('../middlewares/auth');
const MidtransController = require('../controllers/midtransController');
const router = express.Router();

// Middleware untuk autentikasi pengguna
router.use(authenticationUser);

// Rute untuk mengakses token Midtrans untuk Indo Riau
router.post('/indo-riau', MidtransController.midtransTokenIndoRiau);

// Rute untuk mengakses token Midtrans untuk Juvindo
router.post('/juvindo', MidtransController.midtransTokenJuvindo);

module.exports = router;
