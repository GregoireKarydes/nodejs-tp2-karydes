module.exports.validateLogin = async(req, res, next) => {
        if(req.body.password && req.body.firstName) {
            next();
        } else {
            return res.status(400).send('Need password and firstname')
        }
}