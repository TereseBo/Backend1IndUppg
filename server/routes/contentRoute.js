const express= require('express')
const contentRoute = express.Router()
const cookieparser = require('cookie-parser')


// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')

// Controllers
const {getLists} = require('../controllers/contentRoute/getLists')

//Routes
const itemRoute = require('./itemRoute')
const listRoute = require('./listRoute')

contentRoute.use(cookieparser())
contentRoute.use(checkCookie)

contentRoute.use('/item',itemRoute)
contentRoute.use('/list',listRoute)

contentRoute.get('/', getLists)







module.exports = contentRoute