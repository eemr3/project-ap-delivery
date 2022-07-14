const md5 = require('md5');
const { createdToken } = require('../auth/token');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');

const signIn = async (emailUser, password) => {
  const user = await User.findOne({
    where: { email: emailUser },
  });

  if (!user) throw ErrorBase(404, 'E-mail or password incorrect');

  const isPwd = md5(password);
  if (isPwd !== user.password) {
    throw ErrorBase(409, 'E-mail or password incorrect');
  }

  const { name, email, role } = user;
  const hasToken = await createdToken({ name, email, role });

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
