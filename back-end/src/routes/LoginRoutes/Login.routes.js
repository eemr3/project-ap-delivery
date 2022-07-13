const express = require('express');
const rescue = require('express-rescue');
const SigninController = require('../../controller/Login.controller');
const validateJoi = require('../../middlewares/validateJoi');
const { validLogin } = require('../../schemas/joiSchema');

const routes = express.Router();

routes.post('/', validateJoi(validLogin), rescue(SigninController.signin));

module.exports = routes;
