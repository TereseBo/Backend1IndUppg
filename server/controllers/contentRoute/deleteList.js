const { pool } = require('../../database/pool')

function deleteList(req, res) {
    console.log(req.query.id)
    pool.execute('DELETE FROM items where list_id=?',[req.query.id], (err, results) => {
        if(err){
            res.status(500).send(err)
        }
       pool.execute('DELETE FROM lists where id=?',[req.query.id], (err, results) => {
        if(err){
            res.status(500).send(err)       
        }
        res.status(200).send('List and list items deleted')
    })
    })
}

module.exports.deleteList = deleteList