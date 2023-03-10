const { pool } = require('../../database/pool')

function getUsers(req, res) {
    pool.execute('SELECT namn FROM users', (err, results) => {
        if(err){
            res.status(500).send(err)
        }
        res.status(200).send(results)
    })
}


module.exports.getUsers = getUsers