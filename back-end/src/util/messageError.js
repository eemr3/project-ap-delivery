const badRequest = {
  status: 400,
  message: 'Bad Request',
};

const unauthorized = {
  status: 401,
  message: 'Unauthorized',
};

const notFound = {
  status: 404,
  message: 'Not Found',
};

const conflict = {
  status: 404,
  message: 'E-mail or password incorrect',
};

module.exports = {
  badRequest,
  unauthorized,
  notFound,
  conflict,
};
