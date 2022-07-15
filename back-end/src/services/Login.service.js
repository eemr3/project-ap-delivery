const md5 = require('md5');
const { createdToken } = require('../auth/token');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');
const { conflict } = require('../util/messageError');

const signIn = async (emailUser, password) => {
  const user = await User.findOne({
    where: { email: emailUser },
  });

  if (!user) throw ErrorBase(conflict.status, conflict.message);

  const isPwd = md5(password);
  if (isPwd !== user.password) {
    throw ErrorBase(conflict.status, conflict.message);
  }

  const { id, name, email, role } = user;
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

module.exports = {
  signIn,
};
