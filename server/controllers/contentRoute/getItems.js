const { pool } = require('../../database/pool')
const joi=require('joi')

const listIdSchema=joi.object({
    listid:joi.number().min(0).required()})

function getItems(req, res) {
    pool.execute('SELECT i.namn, beskrivning FROM items i INNER JOIN lists l ON i.list_id = l.id where l.id=? AND l.user_id=?',[req.listid, req.user.id], (err, results) => {
        if(err){
            res.status(500).send(err)
        }
        if(results.length===0){
            res.status(204).send('No lists found')
            return
        }
        res.status(200).send(results)
    })
}

module.exports.getItems = getItems