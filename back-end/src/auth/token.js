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

const decodedToken = (token) => {
  try {
    const decoded = jwt.verify(token, fs.readFile('./jwt.evaluation.key', 'utf-8'));

    return decoded;
  } catch (error) {
    return false;
  }
};
module.exports = {
  createdToken,
  decodedToken,
};
