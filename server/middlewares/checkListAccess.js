const { pool } = require('../database/pool')
const joi = require('joi')

const listIdSchema = joi.object({
    id: joi.number().required().min(0)
})

function checkListAccess(req, res, next) {

    const { error, value } = listIdSchema.validate(req.query)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { id } = value
    pool.execute('SELECT * FROM lists WHERE user_id= ?', [req.user.id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length === 0) {
            res.status(204).send('You have no lists')
        }
        const listIds = results.map(list => list.id)
        if (!listIds.includes(id)) {
            res.status(401).send('You are not authorized to access this list')
            return
        }
        next()
     } )
}




module.exports.checkListAccess = checkListAccess