const { Wishlist, Product, User } = require('../models')

class WishlistController {

    static async getAllWishlists(req, res, next) {
        try {
            const wishlists = await Wishlist.findAll({
                include: [
                    {
                        model: Product,
                        as: 'product'
                    },
                    {
                        model: User,
                        as: 'user'
                    }
                ]
            })
            res.status(200).json(wishlists)
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = WishlistController