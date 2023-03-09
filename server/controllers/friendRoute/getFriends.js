const { pool } = require('../../database/pool')

function getFriends(req, res) {

    let query = 'SELECT namn, id FROM users WHERE id IN ('
    for (let i = 0; i < req.user.friends.length; i++) {
        query += '?,'
    }
    query = query.slice(0, -1)
    query += ')'

    pool.execute(query, req.user.friends, (err, results) => {
        if (err) {
            res.status(500).send(err);
        }
        if (results.length === 0) {
            res.status(204).send('No friends found')
            return
        }
        res.status(200).send(results)
    })
}
module.exports.getFriends = getFriends