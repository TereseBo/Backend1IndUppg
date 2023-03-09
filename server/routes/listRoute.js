const express= require('express')
const listRoute = express.Router()

// Middlewares
const {addUserLists} = require('../middlewares/addUserLists.js')
const {checkListAccess} = require('../middlewares/checkListAccess.js')

// Controllers
const { postList } = require('../controllers/contentRoute/listRoute/postList')
const {deleteList} = require('../controllers/contentRoute/listRoute/deleteList')
const {getItems} = require('../controllers/contentRoute/listRoute/getItems')

listRoute.get('/', addUserLists, checkListAccess, getItems)
listRoute.delete('/', addUserLists, checkListAccess, deleteList)
listRoute.post('/', postList)

module.exports = listRoute