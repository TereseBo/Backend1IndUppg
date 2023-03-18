const express= require('express')
const registerRoute = express.Router()

//Controllers
const {register} = require('../controllers/registerRoute/register')

//Route
registerRoute.post('/', register)

module.exports = registerRoute