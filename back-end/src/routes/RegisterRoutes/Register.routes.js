const express = require('express');
const rescue = require('express-rescue');
const validateJoi = require('../../middlewares/validateJoi');
const { validRegister } = require('../../schemas/validateRegister');
const RegisterController = require('../../controller/Register.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { adminMiddleware } = require('../../middlewares/adminMiddleware');

const routes = express.Router();

routes.get(
  '/',
  authMiddleware,
  adminMiddleware,
  RegisterController.getAllUsers,
);
routes.get(
  '/sellers',
  authMiddleware,
  rescue(RegisterController.getAllSellers),
);
routes.post(
  '/',
  validateJoi(validRegister),
  rescue(RegisterController.createRegister),
);
routes.post(
  '/admin',
  authMiddleware,
  validateJoi(validRegister),
  rescue(RegisterController.createRegister),
);
routes.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  rescue(RegisterController.deleteRegister),
);

module.exports = routes;
