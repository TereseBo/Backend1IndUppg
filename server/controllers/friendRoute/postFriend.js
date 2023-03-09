const { pool } = require('../../database/pool')
const joi=require('joi')

const friendSchema = joi.object({
    id: joi.number().integer().min(1).required()
})

function postFriend(req, res) {
    const { error, value } = friendSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { id } = value
    req.user.friends.push(id)
    let unicityControle= new Set(req.user.friends)
    req.user.friends=[...unicityControle]
    console.log(req.user.friends)

    pool.execute('UPDATE users SET friends=? WHERE id=?', [JSON.stringify(req.user.friends), req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        res.status(201).send('Friend added')
    })

}

module.exports.postFriend = postFriend