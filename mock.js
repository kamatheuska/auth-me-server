const express = require('express')
const app = express()
const port = 5000
const authMe = require('./main')()
const authMe2 = require('./main')({
    mongoDbUri: '123',
    jwtSecret: '321'
})
app.get('/', (req, res) => {
    let foo = authMe()
    res.json({
        message: foo
    })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})