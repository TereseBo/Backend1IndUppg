const { pool } = require('../database/pool')

function addUserLists(req, res, next) {
  console.log(req.user)
  console.log('add user lists ran')
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