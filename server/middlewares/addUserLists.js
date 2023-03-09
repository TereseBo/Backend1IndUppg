const { pool } = require('../database/pool')

function addUserLists(req, res, next) {
    pool.execute('SELECT * FROM lists WHERE user_id= ?', [req.user.id], (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        const lists = results.map(list => list.id)
        req.user.lists = lists
        next()
    })
}

module.exports.addUserLists = addUserLists