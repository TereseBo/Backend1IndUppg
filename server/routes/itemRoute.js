const express= require('express')
const itemRoute = express.Router()

// Middlewares
const {addUserLists} = require('../middlewares/addUserLists.js')

// Controllers
const { postItem } = require('../controllers/contentRoute/itemRoute/postItem')
const {deleteItem} = require('../controllers/contentRoute/itemRoute/deleteItem')
const {patchItem} = require('../controllers/contentRoute/itemRoute/patchItem')

itemRoute.use(addUserLists)

itemRoute.post('/', postItem)
itemRoute.delete('/', deleteItem)
itemRoute.patch('/', patchItem)

module.exports = itemRoute