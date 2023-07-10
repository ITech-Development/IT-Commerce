const { compare } = require('../helpers/bcryptjs');
const { AdminSeller } = require('../models')
const { createToken } = require('../helpers/jwt')
const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(10);

class AdminSellerController {

    static async registerAdminSeller(req, res, next) {
        try {
            const {
                email,
                password,
                fullName,
                phoneNumber,
                address,
                imageProfile
            } = req.body
            const adminSeller = await AdminSeller.create({
                email,
                password,
                fullName,
                role: 'adminSeller',
                phoneNumber,
                address,
                imageProfile
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