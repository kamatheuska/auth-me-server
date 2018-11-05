'use strict'

const { initializeApp } = require('./config')
const { handleAddUser } = require('./middleware/users')

module.exports = ({ mongoDbUri, jwtSecret } = {}) => () => {
    const config = initializeApp(mongoDbUri)
    return {
        config,
        handleAddUser
    }
}



// router.use('/users', require('./users'))