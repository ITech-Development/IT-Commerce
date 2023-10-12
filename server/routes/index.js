const express = require('express')
const router = express.Router()
const routeUsers = require('./users')
const routeProductOwners = require('./productOwners')
const routeWarehouseAdmins = require('./warehouseAdmins')
const routeProfiles = require('./profiles')
const routeCarts = require('./carts')
const routeAppointments = require('./appointments')
const routeVouchers = require('./vouchers')
const routeAds = require('./ads')
const routeArticles = require('./articles')
const routeDrivers = require('./drivers')
const routeServices = require('./services')
const routeAdminSellers = require('./adminSellers')
const routeAdminMechanics = require('./adminMechanics')
const routeSuperAdmins = require('./superAdmins')
const routeProductCategories = require('./productCategories')
const routeProductTypes = require('./productTypes')
const routeProducts = require('./products')
const routeProductCarts = require('./productCarts')
const routeTransactions = require('./transactions')
const routeOrders = require('./orders')
const routeCheckouts = require('./checkouts')
const routeOrderProducts = require('./orderProducts')
const routeCheckoutProducts = require('./checkoutProducts')
const routeMidtrans = require('./midtrans')

router.use('/users', routeUsers)
router.use('/product-owners', routeProductOwners)
router.use('/warehouse-admins', routeWarehouseAdmins)
router.use('/profiles', routeProfiles)
router.use('/carts', routeCarts)
router.use('/appointments', routeAppointments)
router.use('/vouchers', routeVouchers)
router.use('/ads', routeAds)
router.use('/articles', routeArticles)
router.use('/drivers', routeDrivers)
router.use('/services', routeServices)
router.use('/admin-sellers', routeAdminSellers)
router.use('/admin-mechanics', routeAdminMechanics)
router.use('/super-admins', routeSuperAdmins)
router.use('/product-categories', routeProductCategories)
router.use('/product-types', routeProductTypes)
router.use('/products', routeProducts)
router.use('/product-carts', routeProductCarts)
router.use('/transactions', routeTransactions)
router.use('/checkouts', routeCheckouts)
router.use('/orders', routeOrders)
router.use('/checkout-products', routeCheckoutProducts)
router.use('/order-products', routeOrderProducts)
router.use('/midtrans', routeMidtrans)

router.get('/', (req, res) => {
    res.send('Halo ini adalah server milik Indo Teknik');
})

module.exports = router
