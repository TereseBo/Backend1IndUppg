const jwt = require('jsonwebtoken');

function checkCookie(req, res, next) {

    try {
        const token = req.cookies.authToken;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            name: decoded.name
        };
        next();
    } catch (err) {
        res.status(401).send('You are not authorized to view this page, please login');
        return
    }
}

module.exports.checkCookie = checkCookie;