const md5 = require('md5');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');
const { already } = require('../util/messageError');
const { createdToken } = require('../auth/token');

const createRegister = async (userInfo) => {
  const { email, password } = userInfo;

  const encryptedPassword = md5(password);

  const userExist = await User.findOne({ where: { email } });

  if (userExist) throw ErrorBase(already.status, already.message);

  const { id, name, role } = await User.create({
    ...userInfo,
    role: userInfo.role || 'customer',
    password: encryptedPassword,
  });

  const hasToken = await createdToken({ id, name, email, role });

  return {
    user: {
      name,
      email,
      role,
    },
    hasToken,
  };
};

const deleteRegister = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw ErrorBase(404, 'User not found');

  await user.destroy();

  return {
    message: 'User deleted',
  };
};

module.exports = {
  createRegister,
  deleteRegister,
};
