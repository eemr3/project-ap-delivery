const { Sale, SaleProduct, User, Product } = require('../database/models');
// const RegisterService = require('./Register.service');

const getAll = async () => {
  const sales = await Sale.findAll();

  return sales;
};

const getAllByUser = async (userId, userRole) => {
  const column = userRole === 'customer' ? 'userId' : 'sellerId';
  const params = { [column]: userId };

  const sales = await Sale.findAll({ where: params });

  return sales;
};

const getById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: Product, as: 'products' },
      { model: User, as: 'user' },
      { model: User, as: 'seller' },
    ],
  });

  return sale;
};

const patchStatus = async (status, id) => {
  await Sale.update(
    { status },
    { where: { id } },
  );
};

const relateProducts = async (products, saleId) => {
  const promises = products.map(({ id, quantity }) => (
    SaleProduct.create({
      saleId,
      productId: id,
      quantity,
    })
  ));

  await Promise.all(promises);
};

const createSale = async (saleInfo) => {
  const { userId, products, sellerId, deliveryAddress, deliveryNumber, totalPrice } = saleInfo;
  const INITIAL_STATUS = 'Pendente';

  await User.findOne({ where: { id: sellerId } });

  const sale = {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: INITIAL_STATUS,
  };

  const createdSale = await Sale.create(sale);

  await relateProducts(products, createdSale.id);

  return createdSale;
};

module.exports = {
  getAll,
  getAllByUser,
  getById,
  patchStatus,
  createSale,
};
