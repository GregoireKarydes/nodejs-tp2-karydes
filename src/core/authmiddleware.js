const jwt = require('jsonwebtoken');
const token_key = process.env.TOKEN_KEY

module.exports.authToken = async(req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send();
    }
    jwt.verify(token, token_key, (err, user) => {
        if(err) {
            return res.status(401).send("Invalid token");
        }
        req.user = user;
        next();
    })
}

module.exports.authAdmin = async(req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send();
    }
    jwt.verify(token, token_key, (err, user) => {
        if(err) {
            return res.status(401).send("Invalid token");
        }
        req.user = user;
    })
    if(!user.role.includes('ADMIN')) return res.status(403).send('Need admin access')
    next();
}