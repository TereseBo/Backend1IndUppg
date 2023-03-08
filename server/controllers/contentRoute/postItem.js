const { pool } = require('../../database/pool')
const joi = require('joi')

const itemSchema = joi.object({
    name: joi.string().min(3).max(50),
    description: joi.string().min(3).max(255),
    list: joi.number().required().min(0)

})


function postItem(req, res) {
    const { error, value } = itemSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { name, description, list } = value
    pool.execute('SELECT * FROM lists WHERE user_id= ?', [req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results) {
            const listIds = results.map(result => result.id)
            if (!listIds.includes(list)) {
                res.status(401).send('You are not authorized to edit this list')
                return
            }

            pool.execute('INSERT INTO items (namn, beskrivning, list_id) VALUES (?,?,?)', [name, description, list], (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(201).send('Item created')
            })
        }
    })
}


module.exports.postItem = postItem