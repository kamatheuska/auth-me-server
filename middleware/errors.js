const { AssertionError } = require('assert')

const defineError = ({ message = 'An error has ocurred', name = 'NewError' }) => {
    let error = new Error (message)
    error.name = name
    return error
}

const handleAssertionError = (error, req, res, next) => {
    if (error instanceof AssertionError) {
        return res.status(400).json({
            type: 'AssertionError',
            message: error.message
        })
    }
    next(error)
}

const handleDatabaseError = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).send(error)
    } else if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(403).send(error)
    }
    next(error)
}

const handleAuthenticationError = (error, req, res, next) => {
    if (error.name === 'AuthenticationError') {
        return res.status(401).send(error)
    }
    next(error)
}

const handleJwtError = (error, req, res, next) => {
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).send(error)
    }
    next(error)
}


const handleUndefinedError = (error, req, res, next) => { // eslint-disable-line
    res.status(400).send(error)
}

module.exports = {
    handleAssertionError,
    handleDatabaseError,
    handleAuthenticationError,
    handleJwtError,
    handleUndefinedError,
    defineError
}
