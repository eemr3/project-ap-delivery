const { Product } = require('../database/models');
const ErrorBase = require('../util/errorBase');
const { notFound, productConflict } = require('../util/messageError');

const getByNameProduct = async (name) => {
  const product = await Product.findOne({ where: { name } });
  
  return product;
};

const createProduct = async (body) => {
  const productExist = await getByNameProduct(body.name);
  
  if (productExist) throw ErrorBase(productConflict.status, productConflict.message); 
  
  const product = await Product.create(body);

  return product;
};

const getAllProducts = async () => {
  const products = await Product.findAll();
  
  return products;
};

const getByIdProduct = async (id) => {
  const product = await Product.findOne({ where: { id } });
  
  if (!product) throw ErrorBase(notFound.status, notFound.message);

  return product;
};

const updateProduct = async (id, body) => {
  const productExist = await getByIdProduct(id);

  if (!productExist) throw ErrorBase(notFound.status, notFound.message);

  await Product.update(body, { where: { id } });
};

const deleteProduct = async (id) => {
  const productExist = await getByIdProduct(id);

  if (!productExist) throw ErrorBase(notFound.status, notFound.message);

  await Product.destroy({ where: { id } });
};

const validateProducts = async (products) => {
  const promises = products.map(({ id }) => getByIdProduct(id));

  const productsData = await Promise.all(promises);

  return productsData.some((p) => p);
};

module.exports = {
  createProduct,
  getAllProducts,
  getByNameProduct,
  getByIdProduct,
  updateProduct,
  deleteProduct,
  validateProducts,
};