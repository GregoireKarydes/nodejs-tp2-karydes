const { users } = require('./db');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.getUsers = () => {
  return users;
};

exports.getUserByFirstName = async (firstName) => {
  const foundUser = users.find((user) => user.firstName == firstName);
  return foundUser;
};

const checkIfAlreadyExist = async (firstName) => {
  const foundUser = await this.getUserByFirstName(firstName)
  if(foundUser) return true
  else return false
}

const cryptPassword = async(password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  password = await bcrypt.hash(password, salt);
  return password
}

exports.createUser = async (req, res) => {
  const data = req.body
  const alreadyExist = await checkIfAlreadyExist(data.firstName)
  if(alreadyExist) return res.status(400).send('This firstname is already used')
  const user = {
    id: uuid.v4(),
    firstName: data.firstName,
    lastName: data.lastName,
    password: await cryptPassword(data.password),
    role : ['MEMBER']
  };

  users.push(user);
  res.status(201).send(user)
};



exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? cryptPassowrd(data.password) : foundUser.password;
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  users.splice(userIndex, 1);
}
