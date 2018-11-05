const mongodb = require('mongodb')
const UserSchema = require('./User')

function createUsersCollection (dbClient) {
    console.log(`Printing- - - - createUsersCollection:`, createUsersCollection)
    return new Promise((resolve, reject) => {
        try {
            dbClient.createCollection('users', {
                validator: { $jsonSchema: UserSchema }
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUsersCollection
}




















// const validator = require('validator')
// const jwt = require('jsonwebtoken')
// const _ = require('lodash')
// const bcrypt = require('bcryptjs')
// const { encryptPassword } = require('../utils')
// const mongoose = require('mongoose')
/* let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
})


let User = mongoose.model('User', UserSchema)

module.exports = { User } */
