const express= require('express')
const registerRoute = express.Router()

const {register} = require('../controllers/registerRoute/register')

registerRoute.get('/', (req, res) => {
    res.send('Hello from register route')
})
registerRoute.post('/', register)

module.exports = registerRoute