const SalesService = require('../services/Sales.service');
const ProductService = require('../services/Product.service');
const { unauthorized } = require('../util/messageError');

const getAll = async (req, res) => {
  const user = req.data;
  
  if (user.role === 'customer') {
    res.status(unauthorized.status).send({ message: unauthorized.message });
  }

  const sales = await SalesService.getAll();

  res.status(200).send(sales);
};

const getAllByUser = async (req, res) => {
  const user = req.data;

  const sales = await SalesService.getAllByUser(user.id, user.role);

  res.status(200).send(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getById(id);

  res.status(200).send(sale);
};

const patchStatus = async (req, res) => {
  const user = req.data;
  const { status } = req.body;
  const { id } = req.params;

  if (user.role === 'customer') {
    res.status(unauthorized.status).send({ message: unauthorized.message });
  }

  await SalesService.patchStatus(status, id);

  return res.status(200).send();
};

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
  getAll,
  getAllByUser,
  getById,
  patchStatus,
  createSale,
  validateProducts,
};