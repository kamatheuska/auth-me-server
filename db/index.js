'use strict'

const MongoClient = require('mongodb').MongoClient
const { handleAppError, defineError } = require('../middleware/errors')
const { getDbUri, port } = require('../config')

let _dbClient

function connectToDb () {
    return MongoClient.connect(getDbUri(), { useNewUrlParser: true })
        .then((dbClient) => {
            _dbClient = dbClient
            Promise.resolve(dbClient.db())
        })
        .catch(handleAppError)
}

function collectionExists (name, db = getDbClient()) {
    if (!db) {
        let errorMessage = 'MongoDB Client undefined on collectionExists'
        throw defineError(errorMessage, 'MongoError')
    }
    console.log(`Printing- - - - collectionExists:`)
    return db.listCollections()
        .toArray()
        .then((items) => !!items.find((col) => col.name === name))
        .catch(handleAppError)
}

function disconnectDb () {
    return _dbClient.close()
}

const getDbClient = () => _dbClient.db()
const getDbResults = ({ result }) => !!result.n && !!result.ok

module.exports = {
    getDbClient,
    getDbResults,
    connectToDb,
    collectionExists,
    disconnectDb
}