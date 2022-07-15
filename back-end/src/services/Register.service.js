const md5 = require('md5');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');
const { createdToken } = require('../auth/token');

const createRegister = async (userInfo) => {
  const { password, email, name } = userInfo;

  const user = {
    name,
    email,
    role: 'customer',
  }

  const hasToken = await createdToken(user);
  const encryptedPassword = md5(password);

  const createdUser = await User.create({
    ...user,
    password: encryptedPassword,
  });

  if (!createdUser) throw ErrorBase(500, 'Internal server error');

  return {
    user,
    hasToken,
  };
};

module.exports = {
  createRegister,
};