const ProductService = require('../services/Product.service');
const { unauthorized } = require('../util/messageError');

const createProduct = async (req, res) => {
  const { role } = req.data;
  if (role === 'administrator') {
    const product = await ProductService.createProduct(req.body);
    return res.status(201).json(product);
  }
  return res.status(unauthorized.status).json({ message: unauthorized.message });
};

const getAllProducts = async (req, res) => {
  const products = await ProductService.getAllProducts();

  return res.status(200).json(products);
};

const getByIdProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getByIdProduct(id);

  return res.status(200).json(product);
};

const getByNameProduct = async (req, res) => {
  const { name } = req.body;
  const product = await ProductService.getAllProducts(name);
  
  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  
  await ProductService.updateProduct(id, body);
  
  return res.status(200).json({ id, ...body });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductService.deletProduct(id);

  return res.status(200).json({ message: 'Deleted' });
};

module.exports = {
  createProduct,
  getAllProducts,
  getByIdProduct,
  getByNameProduct,
  updateProduct,
  deleteProduct,
};