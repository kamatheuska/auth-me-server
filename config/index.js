const { defineError } = require('../middleware/errors') 
const config = {
    port: 5000 || process.env.PORT,
    nodeEnv: process.env.NODE_ENV || 'development',
    uri: null
}

module.exports = () => {
    const initializeApp = (mongoDbUri) => {
        if (!mongoDbUri && config.nodeEnv === 'production') {
            throw defineError({
                message: 'No MongoDB URI has been passed.',
                name: 'MongoError'
            })
        }
        switch (config.nodeEnv) {
            case 'development':
                Object.defineProperty(config, 'uri', {
                    value: 'mongodb://localhost:27017/authMeServer'
                })
                break;
            case 'test':
                Object.defineProperty(config, 'uri', {
                    value: 'mongodb://localhost:27017/authMeServerTest'
                })
                break;
            default:
                config.uri = mongoDbUri
                break;
        }
    }

    const getDbUri = () => config.uri || null

    return {
        ...config,
        initializeApp,
        getDbUri
    }
}