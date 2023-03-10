const joi = require('joi')
const bcrypt = require('bcrypt');

const { pool } = require('../../database/pool')
const registerSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    password: joi.string().min(3).max(50).required(),
})

function register(req, res) {
    const { error, value } = registerSchema.validate(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
        return
    }

    const { name, password } = value

    pool.execute('SELECT * FROM users WHERE name = ?', [name], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (results.length > 0) {
            res.status(403).send('User already exists')
            return
        }
        pool.execute('INSERT INTO users (name, password, friends) VALUES (?, ?,?)', [name, bcrypt.hashSync(password, 10),"[]"], (err, results) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(201).send('You have been registered, please log in');
        })
    })
}

module.exports.register = register