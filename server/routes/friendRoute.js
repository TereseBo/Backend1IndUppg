const express= require('express')
const friendRoute = express.Router()
const cookieparser = require('cookie-parser')

// Middlewares
const {checkCookie} = require('../middlewares/checkCookie')
const {addUserFriends} = require('../middlewares/addUserFriends')

// Controllers
const { getFriends } = require('../controllers/friendRoute/getFriends')
const { postFriend } = require('../controllers/friendRoute/postFriend')



friendRoute.use(cookieparser())
friendRoute.use(checkCookie)
friendRoute.use(addUserFriends)

friendRoute.get('/index', getFriends)
friendRoute.post('/', postFriend)


module.exports = friendRoute