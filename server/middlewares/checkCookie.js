const jwt = require('jsonwebtoken');
const joi = require('joi')

const itemSchema = joi.object({
    id: joi.number().integer().required().min(1),
    name: joi.string().min(3).max(50),
    iat: joi.number().integer().required().min(1),
    exp: joi.number().integer().required().min(1)

})

function checkCookie(req, res, next) {

    try {
        const token = req.cookies.authToken;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { error, value } = itemSchema.validate(decoded)
        if (error) {
            res.status(400).send(error.details[0].message)
            return
        }
        const { id, name } = value
        req.user = {
            id: id,
            name: name
        };

        next();
    } catch (err) {
        res.status(401).send('You are not authorized to view this page, please login');
        return
    }
}

module.exports.checkCookie = checkCookie;