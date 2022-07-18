const express = require('express');
const rescue = require('express-rescue');
// const validateJoi = require('../../middlewares/validateJoi');
// const { validRegister } = require('../../schemas/validateRegister');
const SalesController = require('../../controller/Sales.controller');

const routes = express.Router();

routes.post('/customer/orders/<id>', /*validateJoi()*/ rescue(SalesController.createSales));

module.exports = routes;
