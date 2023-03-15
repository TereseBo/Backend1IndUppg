const express= require('express')
const itemRoute = express.Router()

// Middlewares
const {addUserLists} = require('../middlewares/addUserLists.js')

// Controllers
const { postItem } = require('../controllers/itemRoute/postItem')
const {deleteItem} = require('../controllers/itemRoute/deleteItem')
const {patchItem} = require('../controllers/itemRoute/patchItem')
const {getItem}= require('../controllers/itemRoute/getItem')

itemRoute.use(addUserLists)

itemRoute.post('/', postItem)
itemRoute.delete('/', deleteItem)
itemRoute.patch('/', patchItem)
itemRoute.get('/', getItem)

module.exports = itemRoute