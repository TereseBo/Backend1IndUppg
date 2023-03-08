const { pool } = require('../database/pool')

function checkListAccess(req, res, next) {
    console.log('checkListAccess')
    
}

module.exports.checkListAccess = checkListAccess