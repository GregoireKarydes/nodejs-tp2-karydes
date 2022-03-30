const bcrypt = require('bcryptjs');
const userRepository = require('../models/user-repository');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const token_key = process.env.TOKEN_KEY
const token_expiration = process.env.TOKEN_EXPIRATION

exports.login = async (req, res) => {
  body('firstName').not().isEmpty()
  body('password').not().isEmpty()
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const data = req.body
  const user = await userRepository.getUserByFirstName(data.firstName)
  if(!user) return res.status(404).send('User unknown')
  if(user) {
    const compare = await bcrypt.compare(data.password, user.password)
    if(compare) {
        const token = await createToken(data)
        res.status(200).send(token)
    } else {
      res.status(401).send("Unauthorized")
    }
  }
};

const createToken = (user) => {
    delete user.password
    const expire = parseInt(token_expiration)
    return jwt.sign(user, token_key, {
        expiresIn : expire
    })
}
