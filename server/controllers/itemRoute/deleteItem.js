const { pool } = require('../../database/pool')
const joi = require('joi')

const itemSchema = joi.object({
    id: joi.number().required().min(1),
})

function deleteItem(req, res) {
    const { error, value } = itemSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { id } = value
    pool.execute('SELECT * FROM items WHERE id=?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (results.length === 0) {
            res.status(400).send('No such item found')
            return
        }
        const list = results[0].list_id
        if (!req.user.lists.includes(list)) {
            res.status(403).send('You are not authorized to edit this list')
            return
        }

        pool.execute('DELETE FROM items WHERE id=?', [id], (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send('Item deleted')
        })
    })
    }


module.exports.deleteItem = deleteItem