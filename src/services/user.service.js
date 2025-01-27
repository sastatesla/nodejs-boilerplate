const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user.model');

const createUser = async (name, email, password, mobile) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  user = new User({
    name,
    email,
    mobile,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: config.get('jwtExpiration') });

  return token;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  createUser,
  findUserByEmail,
};