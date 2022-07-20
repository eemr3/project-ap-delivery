const { unauthorized } = require('../util/messageError');

const adminMiddleware = (req, res, next) => {
  const user = req.data;
<<<<<<< HEAD
  if (!user) return res.status(unauthorized.status).json({ message: unauthorized.message });
  if (user.role !== 'administrator') {
    return res.status(unauthorized.status).json({ message: unauthorized.message });
  }
=======

  if (user.role !== 'administrator') {
    return res.status(unauthorized.status).json({ message: unauthorized.message });
  }
  
>>>>>>> c93ac67ad70d1c4548714f3d42996cbb7cfbdb74
  next();
};

module.exports = {
  adminMiddleware,
};