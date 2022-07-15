const express = require('express');
const rescue = require('express-rescue');
const validateJoi = require('../../middlewares/validateJoi');
const { validRegister } = require('../../schemas/validateRegister');
const RegisterController = require('../../controller/Register.controller');

const routes = express.Router();

routes.post('/', validateJoi(validRegister), rescue(RegisterController.createRegister));

module.exports = routes;
