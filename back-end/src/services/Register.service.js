const md5 = require('md5');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');

const createRegister = async (userInfo) => {
  const { password } = userInfo;

  const encryptedPassword = md5(password);

  const createdUser = await User.create({
    ...userInfo,
    password: encryptedPassword,
  });

  if (!createdUser) throw ErrorBase(500, 'Internal server error');

  return createdUser;
};

module.exports = {
  createRegister,
};