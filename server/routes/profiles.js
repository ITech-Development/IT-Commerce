const express = require('express');
const ProfileController = require('../controllers/profileController');
const { authenticationUser } = require('../middlewares/auth');
const router = express.Router()

router.get('/', ProfileController.getAllProfiles);
router.post('/', authenticationUser, ProfileController.addProfile);
router.patch('/:id', authenticationUser, ProfileController.updateProfile);

module.exports = router