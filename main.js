const express = require('express')
const router = express.Router()
const {
    initializeApp,
    getDbUri,
    port
} = require('./config')()

module.exports = ({ mongoDbUri, jwtSecret } = {}) => () => {
    initializeApp(mongoDbUri)
    let uri = mongoDbUri || getDbUri()
    return {
        response: uri
    }
}



// router.use('/users', require('./users'))