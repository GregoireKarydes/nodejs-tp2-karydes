const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const authController = require('../controllers/auth')
const authMiddleware =require('../core/authmiddleware')
const validatorMiddleware =require('../core/validatormiddleware')




router.get('/users/', authMiddleware.authToken,  (req, res) => {
  res.send(userRepository.getUsers())
});

router.get('/users/:firstName', authMiddleware.authToken,  (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/users/', authMiddleware.authAdmin, (req, res) => {
  userRepository.createUser(req, res);
});

router.post('/login', validatorMiddleware.validateLogin, (req, res) => {
  authController.login(req, res);
})

router.put('/users/:id', authMiddleware.authAdmin, (req, res) => {
  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/users/:id', authMiddleware.authToken, (req, res) => {
  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => {
  return router;
}
