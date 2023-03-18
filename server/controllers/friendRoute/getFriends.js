const { pool } = require('../../database/pool')

function getFriends(req, res) {

    if (req.user.friends.length > 0) {
        let query = 'SELECT name, id FROM users WHERE id IN ('

        for (let i = 0; i < req.user.friends.length; i++) {
            query += '?,'
        }
        query = query.slice(0, -1)
        query += ')'

        pool.execute(query, req.user.friends, (err, results) => {
            if (err) {
                res.status(500).send(err);
                return
            }
            res.status(200).send(results)
            return
        })
    } else {
        res.status(204).send()
        return
    }
}

module.exports.getFriends = getFriends