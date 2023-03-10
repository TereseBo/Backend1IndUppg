const {pool}= require('../../database/pool')
const joi = require('joi')

const friendSchema = joi.object({
    id: joi.number().integer().min(1).required()
})


function friendLists(req,res){
    console.log(req.query.id)
    const {error, value} = friendSchema.validate(req.query)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const {id} = value
    if(!req.user.friends.includes(id)){
        res.status(401).send('You are not authorized to view this list')
        return
    }
    pool.execute('SELECT * FROM lists WHERE user_id=?', [id], (err, results) => {
        if(err){
            res.status(500).send(err)
            return
        }
        if(results.length===0){
            res.status(200).send('This user has no lists')
            return
        }
        res.status(200).send(results)
    })
    
}

module.exports.friendLists=friendLists