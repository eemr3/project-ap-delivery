const { decodedToken } = require('../auth/token');
const { unauthorized } = require('../util/messageError');
const { User } = require('../database/models');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization;

  const decoded = await decodedToken(token);

  if (!decoded) {
    return res.status(unauthorized.status).json({ message: unauthorized.message });
  }
  
  const user = await User.findByPk(decoded.id);

  req.data = user;

  next();
};

module.exports = {
  authMiddleware,
};