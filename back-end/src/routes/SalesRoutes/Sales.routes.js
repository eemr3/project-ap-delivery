const express = require('express');
const rescue = require('express-rescue');
const validateJoi = require('../../middlewares/validateJoi');
const { validSales } = require('../../schemas/validateSales');
const SalesController = require('../../controller/Sales.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const routes = express.Router();

routes.post(
  '/',
  authMiddleware,
  validateJoi(validSales),
  rescue(SalesController.validateProducts),
  rescue(SalesController.createSale),
);

module.exports = routes;