const { pool } = require('../../database/pool')
const joi = require('joi')

const itemSchema = joi.object({
    id: joi.number().integer().required().min(1),
})

function getItem(req, res) {
    console.log('new get')
    console.log(req.query)
    const { error, value } = itemSchema.validate(req.query)
    if (error) {
        console.log(error)
        res.status(400).send(error.details[0].message)
        return
    }
    const { id } = value
    console.log(id)
    //res.status(200).send('Item NOT returned')
     pool.execute('SELECT * FROM items WHERE id=?', [id], (err, results) => {
        if (err) {
            res.status(500).send(err)
            return
        }
        if (results.length === 0) {//edit this
            res.status(400).send('No such item found')
            return
        }
        const list = results[0].list_id
        if (!req.user.lists.includes(list)) {
            res.status(403).send('You are not authorized to edit this item')
            return
        }else{
        res.status(200).send(results)
        return
        }
        

    }) 
}


module.exports.getItem = getItem