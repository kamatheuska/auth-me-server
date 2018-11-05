'use strict'

const { defineError } = require('../middleware/errors')
const config = {
    port: getEnvVar('PORT', 5000),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    uri: null
}

function getEnvVar(key, defaultValue = null) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (defaultValue) {
        return defaultValue;
    }
    throw new Error(`Required but not defined : Env Variable ${ key }.`)
}

function setMongoDbUri (uri = null, env) {
    let localUri = 'mongodb://localhost:27017/'
    let dbName = env === 'test' ? 'authMeServerTest' : 'authMeServer'
    let value = uri ? uri : `${localUri}${dbName}`

    return Object.defineProperty(config, 'uri', { value })
}

module.exports = {
    ...config,
    initializeApp (mongoDbUri) {
        if (!mongoDbUri && config.nodeEnv === 'production') {
            throw defineError({
                message: 'No MongoDB URI has been passed.',
                name: 'MongoError'
            })
        }
        return setMongoDbUri(mongoDbUri, config.nodeEnv)
    },
    getDbUri: () => config.uri || null,
}