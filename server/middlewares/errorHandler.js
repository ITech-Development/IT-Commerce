async function errorHandler(error, req, res, next) {
    try {
        let status = 500
        let message = 'Error on the internal server'

        switch (error.name) {
            case 'InvalidCredentials':
                status = 401
                message = 'Invalid email or password'
                break;
            case 'ForbiddenError':
                status = 403
                message = 'Access is not allowed or not your role'
                break;
            case 'SequelizeValidationError':
                message = error.errors.map(el => ({ message: el.message }))
                status = 400
                break;
            case 'NotFoundError':
                status = 404
                message = 'Product not found'
                break;
            case 'NotFoundErrorArticle':
                status = 404
                message = 'Article not found'
                break;
            case 'NotFoundErrorService':
                status = 404
                message = 'Service not found'
                break;
            case 'NotFoundErrorVoucher':
                status = 404
                message = 'Voucher not found'
                break;
            case 'NotFoundErrorAppointment':
                status = 404
                message = 'Appointment not found'
                break;
            case 'NotFoundUserId':
                status = 404
                message = 'UserId not found'
                break;
            case 'NotFoundErrorAd':
                status = 404
                message = 'Ad not found'
                break;
            case 'NotFoundType':
                status = 404
                message = 'Type not found'
                break;
            case 'NotFoundId':
                status = 404
                message = 'Id not found'
                break;
            case 'NotFoundTransaction':
                status = 404
                message = 'Transaction not found'
                break;
            case 'UnauthorizedError':
                status = 401
                message = 'Unauthorized: email or password error'
                break;
            case 'JsonWebTokenError':
                status = 401
                message = 'You are not logged in'
                break;
        }
        res.status(status).json({ error: message })
    } catch (error) {
        next(error)
    }

}

module.exports = errorHandler