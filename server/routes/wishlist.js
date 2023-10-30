const express = require('express')
const WishlistController = require('../controllers/wishlistController')
const router = express.Router()
const { authenticationUser } = require('../middlewares/auth')

router.use(authenticationUser)
router.get('/', authenticationUser, WishlistController.getAllWishlists)


module.exports = router