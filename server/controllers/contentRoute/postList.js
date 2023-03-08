const { pool } = require('../../database/pool')
const joi=require('joi')

const ListSchema=joi.object({
    name:joi.string().min(3).max(50)
})


function postList(req,res){
    const {error,value}=ListSchema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const {name}=value
    console.log(req.user.id)
    pool.execute('INSERT INTO lists (namn,user_id) VALUES (?,?)',[name,req.user.id],(err,results)=>{
        if(err){
            res.status(500).send(err)
        }
   
    res.status(201).send('List created')
     })
}


module.exports.postList = postList