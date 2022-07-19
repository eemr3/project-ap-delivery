const { unauthorized } = require('../util/messageError');

const adminMiddleware = (req, res, next) => {
  const user = req.data;
  if (!user) return res.status(unauthorized.status).json({ message: unauthorized.message });
  if (user.role !== 'administrator') return res.status(unauthorized.status).json({ message: unauthorized.message });
  next();
};

module.exports = {
  adminMiddleware,
}