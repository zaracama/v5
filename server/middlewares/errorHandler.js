const errorHandler = (err, req, res, next) => {
    console.log(err)
    let status = 500
    let message = 'Internal server error'

    if (err.name === 'unauthenticated' || err.name === 'JsonWebTokenError') {
        status = 401
        message = 'Invalid token'
    } else if (err.name === 'no_cuisine') {
        status = 404
        message = 'Cuisine not found'
    } else if (err.name === 'no_bin') {
        status = 404
        message = 'Bin not found'
    } else if (err.name === 'MidtransError') {
        status = 400
        message = err.ApiResponse.error_messages[0]
    }

    res.status(status).json({message})
}

module.exports = errorHandler