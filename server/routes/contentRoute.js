const express= require('express')
const contentRoute = express.Router()
const cookieparser = require('cookie-parser')


// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')
const {checkListAccess} = require('../middlewares/checkListAccess.js')

// Controllers
const {getLists} = require('../controllers/contentRoute/getLists')
const {getItems} = require('../controllers/contentRoute/getItems')
const {deleteList} = require('../controllers/contentRoute/deleteList')
const {postList} = require('../controllers/contentRoute/postList')


contentRoute.use(cookieparser())

contentRoute.get('/index', checkCookie, getLists)

contentRoute.get('/list', checkCookie, checkListAccess, getItems)
contentRoute.delete('/list', checkCookie, checkListAccess, deleteList)

contentRoute.post('/list', checkCookie, postList)

contentRoute.delete('/', checkCookie,(req, res) => {
    res.send('Hello from content route')
})

contentRoute.patch('/', checkCookie,(req, res) => {
    res.send('Hello from content route')
})

module.exports = contentRoute