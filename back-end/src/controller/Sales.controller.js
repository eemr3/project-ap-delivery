const SalesService = require('../services/Sales.service');
const ProductService = require('../services/Product.service');

const createSale = async (req, res) => {
  req.body.userId = req.data.id;
  const createdSales = await SalesService.createSale(req.body);

  return res.status(201).json(createdSales);
};

const validateProducts = async (req, res, next) => {
  const { products } = req.body;

  await ProductService.validateProducts(products);

  next();
};

module.exports = {
  createSale,
  validateProducts,
};