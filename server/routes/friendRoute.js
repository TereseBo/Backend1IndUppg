const express= require('express')
const friendRoute = express.Router()

friendRoute.get('/', (req, res) => {
    res.send('Hello from friend route')
})

module.exports = friendRoute