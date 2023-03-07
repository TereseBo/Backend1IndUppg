const joi = require('joi')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { pool } = require('../../database/pool')
const loginSchema = joi.object({
    namn: joi.string().min(3).max(50).required(),
    password: joi.string().min(3).max(50).required()
})


function logIn(req, res) {
    const { error, value } = loginSchema.validate(req.body)

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
        if (results[0] && bcrypt.compareSync(password, results[0].password)) {
            console.log(results[0].password)
            console.log(bcrypt.compareSync(password, results[0].password))

            const authToken = jwt.sign({id:results[0].id, name:results[0].name}, process.env.SECRET_KEY, { expiresIn: 12000 });

            res.cookie('authToken', authToken, {
                httpOnly: true,
                sameSite: 'none',
                //secure: true,
                maxAge: 360000
            });
            res.status(200).send('Welcome, have a cookie')
            return
        }
        res.status(401).send('Wrong username or password')
    })
        
}

module.exports.logIn = logIn