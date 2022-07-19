const { Sale, SaleProduct, User } = require('../database/models');

const getAll = async () => {
  const sales = await Sale.findAll();

  return sales;
};

const getAllByUser = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });

  return sales;
};

const getById = async (id) => {
  const sale = await Sale.findOne({ where: { id } });

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