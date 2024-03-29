const { pool } = require('../../database/pool')
const joi = require('joi')

const itemSchema = joi.object({
    id: joi.number().integer().required().min(1),
    completed: joi.number().integer().required().min(0).max(1)
})

function patchItem(req, res) {
    const { error, value } = itemSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { id, completed } = value
    pool.execute('SELECT * FROM items WHERE id=?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (!results.length > 0) {
            res.status(204).send()
            return
        }
        const list = results[0].list_id
        if (!req.user.lists.includes(list)) {
            res.status(403).send('You are not authorized to edit this item')
            return
        }
        if (completed === 1) {
            pool.execute('UPDATE items SET completed=Now() WHERE id=?', [id], (err, results) => {
                if (err) {
                    res.status(500).send(err)
                    return
                }
                res.status(200).send('Item updated')
                return
            })
        } else {
            pool.execute('UPDATE items SET completed=NULL WHERE id=?', [id], (err, results) => {
                if (err) {
                    res.status(500).send(err)
                    return
                }
                res.status(200).send('Item updated')
                return
            })
        }
    })
}

module.exports.patchItem = patchItem