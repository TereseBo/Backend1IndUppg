const { pool } = require('../../database/pool')

function getLists(req, res) {
    pool.execute('SELECT * FROM lists where user_id=?', [req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err)
        }
        if (results.length > 0) {
            res.status(200).send(results)
            return
        }
        res.status(204).send()
    })
}

module.exports.getLists = getLists