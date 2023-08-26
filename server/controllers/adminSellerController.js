const { compare } = require('../helpers/bcryptjs');
const { AdminSeller, Checkout, CheckoutProduct, Product, ProductOwner, ProductCategory, ProductType, WarehouseAdmin } = require('../models')
const { createToken } = require('../helpers/jwt')
const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10);

class AdminSellerController {

    static async getAllAdminSellers(req, res, next) {
        try {
            const adminSellers = await AdminSeller.findAll()
            res.status(200).json(adminSellers)
        } catch (error) {
            next(error)
        }
    }

    static async getAllProductsByVoucherCode(req, res, next) {
        const voucherCodeToSearch = 'IT01';

        try {
            // Mencari data checkout berdasarkan kode voucher
            const checkouts = await Checkout.findAll({
                where: { voucherCode: voucherCodeToSearch },
            });

            const products = [];

            // Iterate through checkouts
            for (const checkout of checkouts) {
                const checkoutId = checkout.id;

                // Retrieve checkout products and associated product data
                const checkoutProducts = await CheckoutProduct.findAll({
                    where: {
                        checkoutId: checkoutId
                    },
                    include: [
                        {
                            model: Product,   // Include Product model
                            as: 'products',    // Define alias for the association,
                            include: [
                                {
                                    model: ProductCategory,
                                    as: 'categories',
                                },
                                {
                                    model: ProductType,
                                    as: 'types'
                                },
                                {
                                    model: ProductOwner,
                                    as: 'product_owners'
                                },
                                {
                                    model: WarehouseAdmin,
                                    as: 'authors'
                                },
                            ]
                        }
                    ],
                });

                // Map and collect the product details
                for (const cp of checkoutProducts) {
                    products.push({
                        product: cp.products,
                        quantity: cp.quantity,
                        createdAt: cp.createdAt
                    });
                }
            }

            // Sekarang, 'products' berisi daftar produk yang menggunakan voucher kode 'IT01'
            console.log(products, 'hsrtghjklkjhgfdfghj');
            res.status(200).json(products)
        } catch (error) {
            // Tangani kesalahan jika terjadi
            console.error(error, 'eror rrrrrrrrrrrrr');
        }


    }



    static async registerAdminSeller(req, res, next) {
        try {
            const {
                email,
                password,
                fullName,
                phoneNumber,
                address,
                imageProfile,
                voucherCode
            } = req.body
            const adminSeller = await AdminSeller.create({
                email,
                password,
                fullName,
                role: 'adminSeller',
                phoneNumber,
                address,
                imageProfile,
                voucherCode
            })
            res.status(201).json({ adminSeller })
        } catch (error) {
            next(error)
        }
    }

    static async loginAdminSeller(req, res, next) {
        try {
            const { email, password } = req.body
            const adminSeller = await AdminSeller.findOne({
                where: { email }
            })
            if (!adminSeller) {
                throw { name: 'InvalidCredentials' }
            } else {
                const compareResult = compare(password, adminSeller.password)
                if (!compareResult) {
                    throw { name: 'InvalidCredentials' }
                } else {
                    const { id, email, role } = adminSeller
                    let access_token = createToken({
                        id, email, role
                    })
                    res.status(200).json({
                        access_token, fullName: adminSeller.fullName
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateAdminSeller(req, res, next) {
        try {
            if (req.body.password) {
                const hashedPassword = bcryptjs.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
            }

            let filename = null
            try {
                filename = req.file.filename
            } catch (error) {
                filename = req.body.imageProfile
            }
            AdminSeller.update({
                email: req.body.email,
                password: req.body.password,
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                imageProfile: filename
            }, {
                where: {
                    id: req.params.id
                }
            }).then((user) => {
                res.send({
                    status: 'success',
                    data: {
                        id: req.params.id
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AdminSellerController