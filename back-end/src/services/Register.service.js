const md5 = require('md5');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');
const { createdToken } = require('../auth/token');
const { already } = require('../util/messageError');

const createRegister = async (userInfo) => {
  const { password, email, name } = userInfo;

  const user = {
    name,
    email,
    role: 'customer',
  };

  const encryptedPassword = md5(password);
  const userExist = await User.findOne({ where: { email } });
  
  if (userExist) throw ErrorBase(already.status, already.message);

  const createdUser = await User.create({
    ...user,
    password: encryptedPassword,
  });

  return {
    ...createdUser,
  };
};

module.exports = {
  createRegister,
};
