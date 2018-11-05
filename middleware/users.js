'use strict'

const {
    getDbResults,
    getDbClient,
    connectToDb,
    collectionExists,
    disconnectDb
} = require('../db')
const { handleAppError } = require('../middleware/errors')
const { createUsersCollection } = require('../models/User')

const handleAddUser = (req, res, next) => {
    let { email, password } = req.body
    let user = { email, password }

    connectToDb()
        .then((db) => {
            if (!collectionExists('users')) {
                return createUsersCollection(db)
            }
            return Promise.resolve()
        })
        .then(() => getDbClient()
            .collection('users')
            .insertOne(user))
        .then((results) => {
            if (getDbResults(results)) {
                console.log(`Printing- - - - results:`, results)
                res.status(200).send()
            }
        })
        .catch(handleAppError)
}

module.exports = {
    handleAddUser
}