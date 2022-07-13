const bcpt = require('bcryptjs');
const { createdToken } = require('../auth/token');
const { User } = require('../database/models');
const ErrorBase = require('../util/errorBase');

const signin = async (emailUser, password) => {
  const user = await User.findOne({
    where: { email: emailUser },
  });

  if (!user) throw ErrorBase(404, 'E-mail or password incorrect');

  const pwdTrue = await bcpt.compare(password, user.password);

  if (!pwdTrue) throw ErrorBase(409, 'E-mail or password incorrect');
  
  const { name, email, role } = user;
   const token = await createdToken({ name, email, role });

  return {
    name,
    email,
    role,    
    token,
  };
};

module.exports = {
  signin,
};
