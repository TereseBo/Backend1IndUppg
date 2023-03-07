const express= require('express')
const loginRoute = express.Router()
const {logIn} = require('../controllers/loginRoute/login')

loginRoute.get('/', (req, res) => {
    res.send('Hello from login route')
})

loginRoute.post('/', logIn)

module.exports = loginRoute