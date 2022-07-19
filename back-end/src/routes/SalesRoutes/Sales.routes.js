const express = require('express');
const rescue = require('express-rescue');
const validateJoi = require('../../middlewares/validateJoi');
const { validSales } = require('../../schemas/validateSales');
const SalesController = require('../../controller/Sales.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');

const routes = express.Router();

routes.get(
  '/',
  authMiddleware,
  rescue(SalesController.getAll),
);

routes.get(
  '/user',
  authMiddleware,
  rescue(SalesController.getAllFromCustomer),
);

routes.get(
  '/:id',
  authMiddleware,
  rescue(SalesController.getById),
);

routes.patch(
  '/:id',
  authMiddleware,
  validateJoi(validSales),
  rescue(SalesController.patchStatus),
);

routes.post(
  '/',
  authMiddleware,
  validateJoi(validSales),
  rescue(SalesController.validateProducts),
  rescue(SalesController.createSale),
);

module.exports = routes;