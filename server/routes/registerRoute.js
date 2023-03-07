const express= require('express')
const registerRoute = express.Router()

registerRoute.get('/', (req, res) => {
    res.send('Hello from register route')
})

module.exports = registerRoute