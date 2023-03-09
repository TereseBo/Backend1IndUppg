const joi = require('joi')
const bcrypt = require('bcrypt');

const { pool } = require('../../database/pool')
const registerSchema = joi.object({
    namn: joi.string().min(3).max(50).required(),
    password: joi.string().min(3).max(50).required(),
})

function register(req, res) {
    const { error, value } = registerSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const { namn, password } = value

    pool.execute('SELECT * FROM users WHERE namn = ?', [namn], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length > 0) {
            res.status(403).send('User already exists')
            return
        }
        pool.execute('INSERT INTO users (namn, password, friends) VALUES (?, ?,?)', [namn, bcrypt.hashSync(password, 10),"[]"], (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(201).send('You have been registered, please log in');
        })
    })
}

module.exports.register = register