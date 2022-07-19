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

const updateProduct = async (req, res) => {
  const { role } = req.data;
  const { id } = req.params;
  const { body } = req;
  
  if (role === 'administrator') {
    await ProductService.updateProduct(id, body);
    return res.status(200).json({ id, ...body });
  }

  return res.status(unauthorized.status).json({ message: unauthorized.message });
};

const deleteProduct = async (req, res) => {
  const { role } = req.data;
  const { id } = req.params;

  if (role === 'administrator') {
    await ProductService.deleteProduct(id);
    return res.status(200).json({ message: 'Deleted' });
  }

  return res.status(unauthorized.status).json({ message: unauthorized.message });
};

module.exports = {
  createProduct,
  getAllProducts,
  getByIdProduct,
  // getByNameProduct,
  updateProduct,
  deleteProduct,
};