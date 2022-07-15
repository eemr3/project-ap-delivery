const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const createdToken = async (user) => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  const token = jwt.sign(user, secret, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });

  return token;
};

const decodedToken = async (token) => {
  const secret = await fs.readFile('./jwt.evaluation.key', 'utf-8');
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return false;
  }
};
module.exports = {
  createdToken,
  decodedToken,
};
