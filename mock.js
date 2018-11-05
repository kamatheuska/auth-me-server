const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const authMeServer = require('./main')()
const authMe2 = require('./main')({
    mongoDbUri: '123',
    jwtSecret: '321'
})
let { handleAddUser } = authMeServer()

app.use(bodyParser.json())

app.post('/users', handleAddUser)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})