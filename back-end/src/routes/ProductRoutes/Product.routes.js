const express = require('express');
const rescue = require('express-rescue');
const ProductController = require('../../controller/Product.contoller');
const validateJoi = require('../../middlewares/validateJoi');
const { validProduct } = require('../../schemas/validateProduct');
const { authMiddleware } = require('../../middlewares/authMIddleware');

const routes = express.Router();

routes.post(
  '/',
  authMiddleware,
  validateJoi(validProduct),
  rescue(ProductController.createProduct),
);

routes.get(
  '/:id',
  authMiddleware,
  rescue(ProductController.getByIdProduct),
);

routes.get(
  '/',
  authMiddleware,  
  rescue(ProductController.getAllProducts),
);

routes.put(
  '/:id',
  authMiddleware,
  validateJoi(validProduct),
  rescue(ProductController.updateProduct),
);

routes.delete(
  '/:id',
  authMiddleware,
  rescue(ProductController.deleteProduct),
);

module.exports = routes;
