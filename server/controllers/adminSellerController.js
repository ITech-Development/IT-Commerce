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

    // static async getTransactionListByVoucherCode(req, res, next) {
    //     if (req.adminSeller.id === 4) {
    //         try {
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'IT01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay' // Filter by paymentStatus
    //                 },
    //                 order: [['createdAt', 'ASC']],
    //             });

    //             const orderList = {};

    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }

    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             const orderListArray = Object.values(orderList);

    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else if (req.adminSeller.id === 5) {
    //         try {
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'MS01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay' // Filter by paymentStatus
    //                 },
    //                 order: [['createdAt', 'ASC']],
    //             });

    //             const orderList = {};

    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }

    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             const orderListArray = Object.values(orderList);

    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else if (req.adminSeller.id === 6) {
    //         try {
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'TK01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay' // Filter by paymentStatus
    //                 },
    //                 order: [['createdAt', 'ASC']],
    //             });

    //             const orderList = {};

    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }
    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             const orderListArray = Object.values(orderList);

    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else {
    //         console.log('Check the server again');
    //     }
    // }

    static async getTransactionListByVoucherCode(req, res, next) {
        try {
            let voucherCode = '';
            if (req.adminSeller.id === 4) {
                voucherCode = 'IT01';
            } else if (req.adminSeller.id === 5) {
                voucherCode = 'MS01';
            } else if (req.adminSeller.id === 6) {
                voucherCode = 'TK01';
            } else {
                console.log('Check the server again');
                return;
            }
    
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
                    '$checkouts.voucherCode$': voucherCode,
                    '$checkouts.paymentStatus$': 'pay'
                },
                order: [['createdAt', 'ASC']],
            });
    
            const orderList = {};
    
            for (const checkoutProduct of checkoutProducts) {
                const checkoutId = checkoutProduct.checkoutId;
    
                if (!orderList[checkoutId]) {
                    orderList[checkoutId] = {
                        checkout: checkoutProduct.checkouts,
                        products: []
                    };
                }
    
                orderList[checkoutId].products.push(checkoutProduct.products);
            }
    
            const orderListArray = Object.values(orderList);
    
            res.status(200).json(orderListArray);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    

    

    // static async getOrderListByVoucherCode(req, res, next) {
    //     if (req.adminSeller.id === 4) {
    //         try {
    //             // Ambil semua checkout products dari database dengan filter berdasarkan voucherCode dan paymentStatus
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'IT01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay'   // Filter by paymentStatus
    //                 }
    //             });

    //             // Buat objek untuk menyimpan daftar pesanan
    //             const orderList = {};

    //             // Iterasi melalui setiap checkout product
    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 // Jika checkout ID belum ada dalam daftar pesanan, tambahkan
    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }

    //                 // Tambahkan produk ke dalam daftar pesanan yang sesuai dengan checkout ID
    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             // Ubah objek pesanan menjadi array
    //             const orderListArray = Object.values(orderList);

    //             // Kirim daftar pesanan sebagai respons JSON
    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else if (req.adminSeller.id === 5) {
    //         try {
    //             // Ambil semua checkout products dari database dengan filter berdasarkan voucherCode dan paymentStatus
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'MS01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay'   // Filter by paymentStatus
    //                 }
    //             });

    //             // Buat objek untuk menyimpan daftar pesanan
    //             const orderList = {};

    //             // Iterasi melalui setiap checkout product
    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 // Jika checkout ID belum ada dalam daftar pesanan, tambahkan
    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }

    //                 // Tambahkan produk ke dalam daftar pesanan yang sesuai dengan checkout ID
    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             // Ubah objek pesanan menjadi array
    //             const orderListArray = Object.values(orderList);

    //             // Kirim daftar pesanan sebagai respons JSON
    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else if (req.adminSeller.id === 6) {
    //         try {
    //             // Ambil semua checkout products dari database dengan filter berdasarkan voucherCode dan paymentStatus
    //             const checkoutProducts = await CheckoutProduct.findAll({
    //                 include: [
    //                     {
    //                         model: Checkout,
    //                         as: 'checkouts',
    //                         include: [
    //                             {
    //                                 model: User,
    //                                 as: 'users'
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: Product,
    //                         as: 'products'
    //                     }
    //                 ],
    //                 where: {
    //                     '$checkouts.voucherCode$': 'TK01', // Filter by voucherCode
    //                     '$checkouts.paymentStatus$': 'pay'   // Filter by paymentStatus
    //                 }
    //             });

    //             // Buat objek untuk menyimpan daftar pesanan
    //             const orderList = {};

    //             // Iterasi melalui setiap checkout product
    //             for (const checkoutProduct of checkoutProducts) {
    //                 const checkoutId = checkoutProduct.checkoutId;

    //                 // Jika checkout ID belum ada dalam daftar pesanan, tambahkan
    //                 if (!orderList[checkoutId]) {
    //                     orderList[checkoutId] = {
    //                         checkout: checkoutProduct.checkouts,
    //                         products: []
    //                     };
    //                 }

    //                 // Tambahkan produk ke dalam daftar pesanan yang sesuai dengan checkout ID
    //                 orderList[checkoutId].products.push(checkoutProduct.products);
    //             }

    //             // Ubah objek pesanan menjadi array
    //             const orderListArray = Object.values(orderList);

    //             // Kirim daftar pesanan sebagai respons JSON
    //             res.status(200).json(orderListArray);
    //         } catch (error) {
    //             console.error(error);
    //             res.status(500).json({ error: 'Internal server error' });
    //         }
    //     } else {
    //         console.log('check lagi servernya ya');
    //     }
    // }

    static async getOrderListByVoucherCode(req, res, next) {
        let voucherCode = '';
    
        switch (req.adminSeller.id) {
            case 4:
                voucherCode = 'IT01';
                break;
            case 5:
                voucherCode = 'MS01';
                break;
            case 6:
                voucherCode = 'TK01';
                break;
            default:
                console.log('Check the server again');
                return;
        }
    
        try {
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
                    '$checkouts.voucherCode$': voucherCode,
                    '$checkouts.paymentStatus$': 'pay'
                },
                order: [['createdAt', 'ASC']],
            });
    
            const orderList = {};
    
            for (const checkoutProduct of checkoutProducts) {
                const checkoutId = checkoutProduct.checkoutId;
    
                if (!orderList[checkoutId]) {
                    orderList[checkoutId] = {
                        checkout: checkoutProduct.checkouts,
                        products: []
                    };
                }
    
                orderList[checkoutId].products.push(checkoutProduct.products);
            }
    
            const orderListArray = Object.values(orderList);
    
            res.status(200).json(orderListArray);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
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