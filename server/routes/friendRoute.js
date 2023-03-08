const express= require('express')
const friendRoute = express.Router()
const cookieparser = require('cookie-parser')

friendRoute.use(cookieparser())

friendRoute.get('/', (req, res) => {
    res.send('Hello from friend route')
})

module.exports = friendRoute