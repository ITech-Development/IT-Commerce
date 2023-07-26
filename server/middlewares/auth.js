const { verifyToken } = require("../helpers/jwt")
const { User, Product, SuperAdmin, AdminSeller } = require('../models')

// async function authentication(req, res, next) {
//     try {
//         const { access_token } = req.headers
//         const verify = verifyToken(access_token)
//         const user = await User.findOne({
//             where: { id: verify.id }
//         })

//         if (!user) {
//             throw { name: 'UnauthorizedError' }
//         }

//         req.user = {
//             id: user.id,
//             role: user.role,
//             email: user.email
//         }
//         next()
//     } catch (error) {
//         next(error)
//     }
// }

async function authenticationUser(req, res, next) {
    try {
        let { access_token } = req.headers
        let verify = verifyToken(access_token)
        let user = await User.findOne({
            where: { id: verify.id }
        })
        if (!user) {
            throw { name: 'ForbiddenError' }
        }
        req.user = {
            id: user.id, role: user.role, email: user.email
        }
        next()
    } catch (error) {

        next(error);
    }
}

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        const verify = verifyToken(access_token)

        const superAdmin = await SuperAdmin.findOne({
            where: { id: verify.id }
        })

        if (!superAdmin) {
            throw { name: 'ForbiddenError' }
        }

        req.superAdmin = {
            id: superAdmin.id,
            role: superAdmin.role,
            email: superAdmin.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

async function authenticationAdminSeller(req, res, next) {
    try {
        const { access_token } = req.headers
        const verify = verifyToken(access_token)
        const adminSeller = await AdminSeller.findOne({
            where: { id: verify.id }
        })

        if (!adminSeller) {
            throw { name: 'ForbiddenError' }
        }
        req.adminSeller = {
            id: adminSeller.id,
            role: adminSeller.role,
            email: adminSeller.email
        }
        next()
    } catch (error) {
        next(error)
    }
}

// async function authorization(req, res, next) {
//     try {
//         let { id } = req.params
//         let product = await Product.findByPk(id)
//         if (!product) {
//             throw { name: 'NotFoundError' }
//         }

//         if (req.user.role === 'superAdmin') {
//             next()
//         } else {


//             if (req.user.id === product.authorId) {
//                 next()
//             } else {
//                 throw { name: 'ForbiddenError' }
//             }
//         }
//     } catch (error) {
//         next(error)
//     }
// }

async function authorization(req, res, next) {
    try {
        if (req.superAdmin.role === "superAdmin") {
            next();
        } else {
            throw { name: 'ForbiddenError' };
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function authorizationAdminSeller(req, res, next) {
    try {
        if (req.adminSeller.role === 'adminSeller') {
            next();
        } else {
            throw { name: 'ForbiddenError' };
        }
    } catch (error) {
        next(error);
    }
}





module.exports = { authentication, authorization, authenticationUser, authenticationAdminSeller, authorizationAdminSeller }