const { pool } = require('../../database/pool')
const joi = require('joi')

const listSchema = joi.object({
    name: joi.string().min(3).max(50)
})

function postList(req, res) {
    const { error, value } = listSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { name } = value
    pool.execute('INSERT INTO lists (name,user_id) VALUES (?,?)', [name, req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(201).send('List created')
    })
}

module.exports.postList = postList