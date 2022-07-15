const express = require('express');
const rescue = require('express-rescue');
const SignInController = require('../../controller/Login.controller');
const validateJoi = require('../../middlewares/validateJoi');
const { validLogin } = require('../../schemas/validateLogin');

const routes = express.Router();

routes.post('/', validateJoi(validLogin), rescue(SignInController.signIn));

module.exports = routes;
