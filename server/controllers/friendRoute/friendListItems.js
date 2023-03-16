const { pool } = require('../../database/pool')
const joi = require('joi')

const listIdSchema = joi.object({
    id: joi.number().required().min(1)
})

function friendListItems(req,res){
    const {error, value} = listIdSchema.validate(req.query)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const {id} = value
    pool.execute('SELECT user_id FROM lists WHERE id=?', [id], (err, results) => {
        if(err){
            res.status(500).send(err)
            return
        }
        if(results.length===0){
            res.status(400).send('No such list found')
            return
        }
        const user = results[0].user_id
        if(!req.user.friends.includes(user)){
            res.status(403).send('You are not authorized to view this list')
            return
        }
        pool.execute('SELECT * FROM items WHERE list_id=?', [id], (err, results) => {
            if(err){
                res.status(500).send(err)
                return
            }
            if(results.length===0){
                res.status(204).send()
                return
            }
            res.status(200).send(results)
        })
    })
}

module.exports.friendListItems=friendListItems