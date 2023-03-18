const { pool } = require('../../database/pool')

function getItems(req, res) {
    pool.execute('SELECT * FROM items where list_id=?',[req.query.id], (err, results) => {
        if(err){
            res.status(500).send(err)
        }
        if(!results.length>0){
            res.status(204).send()
            return
        }
        res.status(200).send(results)
    })
}

module.exports.getItems = getItems