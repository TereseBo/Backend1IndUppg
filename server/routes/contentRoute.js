const express= require('express')
const contentRoute = express.Router()
const cookieparser = require('cookie-parser')


// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')
const {checkListAccess} = require('../middlewares/checkListAccess.js')

// Controllers
const {getLists} = require('../controllers/contentRoute/getLists')
const {getItems} = require('../controllers/contentRoute/getItems')


contentRoute.use(cookieparser())

contentRoute.get('/', checkCookie, getLists)

contentRoute.get('/:listId', checkCookie, getItems)

contentRoute.post('/', checkCookie,(req, res) => {
    res.send('Hello from content route')
})

contentRoute.delete('/', checkCookie,(req, res) => {
    res.send('Hello from content route')
})

contentRoute.patch('/', checkCookie,(req, res) => {
    res.send('Hello from content route')
})

module.exports = contentRoute