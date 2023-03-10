const { pool } = require('../database/pool')
const joi = require('joi')

const listIdSchema = joi.object({
    id: joi.number().required().min(1)
})

function checkListAccess(req, res, next) {

    console.log(req.user.lists)

    const { error, value } = listIdSchema.validate(req.query)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }
    const { id } = value
    if (!req.user.lists.includes(id)) {
        res.status(401).send('You are not authorized to access this list')
        return
    }
    next()
}
module.exports.checkListAccess = checkListAccess