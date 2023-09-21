const { compare } = require('../helpers/bcryptjs');
const { AdminSeller, Checkout, CheckoutProduct, Product, ProductOwner, ProductCategory, ProductType, WarehouseAdmin, User } = require('../models')
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

    static async getTransactionListByVoucherCode(req, res, next) {
        if (req.adminSeller.id === 4) {
            try {
                // Ambil semua checkout products dari database dengan filter berdasarkan voucherCode
                const checkoutProducts = await CheckoutProduct.findAll({
                    include: [
                        {
                            model: Checkout,
                            as: 'checkouts',
                            include: [
                                {
                                    model: User,
                                    as: 'users'
                                }
                            ]
                        },
                        {
                            model: Product,
                            as: 'products'
                        }
                    ],
                    where: {
                        '$checkouts.voucherCode$': 'IT01' // Filter by voucherCode
                    }
                });

                // Buat objek untuk menyimpan daftar pesanan
                const orderList = {};

                // Iterasi melalui setiap checkout product
                for (const checkoutProduct of checkoutProducts) {
                    const checkoutId = checkoutProduct.checkoutId;

                    // Jika checkout ID belum ada dalam daftar pesanan, tambahkan
                    if (!orderList[checkoutId]) {
                        orderList[checkoutId] = {
                            checkout: checkoutProduct.checkouts,
                            products: []
                        };
                    }

                    // Tambahkan produk ke dalam daftar pesanan yang sesuai dengan checkout ID
                    orderList[checkoutId].products.push(checkoutProduct.products);
                }

                // Ubah objek pesanan menjadi array
                const orderListArray = Object.values(orderList);

                // Kirim daftar pesanan sebagai respons JSON
                res.status(200).json(orderListArray);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            console.log('check lagi servernya ya');
        }
    }

    static async getOrderListByVoucherCode(req, res, next) {
        if (req.adminSeller.id === 4) {
            try {
                // Ambil semua checkout products dari database dengan filter berdasarkan voucherCode
                const checkoutProducts = await CheckoutProduct.findAll({
                    include: [
                        {
                            model: Checkout,
                            as: 'checkouts',
                            include: [
                                {
                                    model: User,
                                    as: 'users'
                                }
                            ]
                        },
                        {
                            model: Product,
                            as: 'products'
                        }
                    ],
                    where: {
                        '$checkouts.voucherCode$': 'IT01' // Filter by voucherCode
                    }
                });

                // Buat objek untuk menyimpan daftar pesanan
                const orderList = {};

                // Iterasi melalui setiap checkout product
                for (const checkoutProduct of checkoutProducts) {
                    const checkoutId = checkoutProduct.checkoutId;

                    // Jika checkout ID belum ada dalam daftar pesanan, tambahkan
                    if (!orderList[checkoutId]) {
                        orderList[checkoutId] = {
                            checkout: checkoutProduct.checkouts,
                            products: []
                        };
                    }

                    // Tambahkan produk ke dalam daftar pesanan yang sesuai dengan checkout ID
                    orderList[checkoutId].products.push(checkoutProduct.products);
                }

                // Ubah objek pesanan menjadi array
                const orderListArray = Object.values(orderList);

                // Kirim daftar pesanan sebagai respons JSON
                res.status(200).json(orderListArray);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        } else {
            console.log('check lagi servernya ya');
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

    static async deleteAdminSeller(req, res, next) {
        try {
            const adminSeller = await AdminSeller.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (adminSeller) {
                await AdminSeller.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json(adminSeller)
            } else {
                throw { name: 'NotFoundError' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AdminSellerController