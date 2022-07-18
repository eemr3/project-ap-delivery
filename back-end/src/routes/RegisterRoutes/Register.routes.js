const express = require('express');
const rescue = require('express-rescue');
const validateJoi = require('../../middlewares/validateJoi');
const { validRegister } = require('../../schemas/validateRegister');
const RegisterController = require('../../controller/Register.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const routes = express.Router();

routes.post('/', validateJoi(validRegister), rescue(RegisterController.createRegister));
routes.delete('/', authMiddleware,rescue(RegisterController.deleteRegister));

module.exports = routes;
