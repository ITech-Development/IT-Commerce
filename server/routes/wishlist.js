const express = require('express')
const WishlistController = require('../controllers/wishlistController')
const router = express.Router()
const { authenticationUser } = require('../middlewares/auth')

router.use(authenticationUser)
router.get('/', WishlistController.getAllWishlists)
router.post('/:id', WishlistController.addWishlist)
router.delete('/:id', WishlistController.removeWishlist)

module.exports = router