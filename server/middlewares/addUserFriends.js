const { pool } = require('../database/pool')

function addUserFriends(req, res, next) {
    pool.execute('SELECT friends FROM users WHERE id= ?', [req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        }
        req.user.friends=results[0].friends
        next()
    })
}

module.exports.addUserFriends = addUserFriends