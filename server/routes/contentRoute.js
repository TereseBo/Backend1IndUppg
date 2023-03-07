const express= require('express')
const contentRoute = express.Router()

contentRoute.get('/', (req, res) => {
    res.send('Hello from content route')
})

module.exports = contentRoute