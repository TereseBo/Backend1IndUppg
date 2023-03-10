const express= require('express')
const friendRoute = express.Router()
const cookieparser = require('cookie-parser')

// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')
const {addUserFriends} = require('../middlewares/addUserFriends')

// Controllers
const { getFriends } = require('../controllers/friendRoute/getFriends')
const { postFriend } = require('../controllers/friendRoute/postFriend')
const { friendLists } = require('../controllers/friendRoute/friendLists')
const { friendListItems } = require('../controllers/friendRoute/friendListItems.js')

friendRoute.use(cookieparser())
friendRoute.use(checkCookie)
friendRoute.use(addUserFriends)

friendRoute.get('/', getFriends)
friendRoute.post('/', postFriend)
friendRoute.get('/lists', friendLists)
friendRoute.get('/items', friendListItems)


module.exports = friendRoute