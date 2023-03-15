const express= require('express')
const loginRoute = express.Router()
const cookieparser = require('cookie-parser')
const {logIn} = require('../controllers/loginRoute/login')

// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')

loginRoute.post('/', logIn)

loginRoute.use(cookieparser())

loginRoute.get('/',  checkCookie, (req, res) => {
    res.status(200).send('You are logged in')
})

module.exports = loginRoute