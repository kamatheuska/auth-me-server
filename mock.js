const express = require('express')
const app = express()
const port = 5000
const authMe2 = require('./main')()
const authMe = require('./main')({
    mongoDbUri: '123',
    jwtSecret: '321'
})
const test = authMe()
app.get('/', (req, res) => {
    let foo = test
    res.json({
        message: foo
    })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})