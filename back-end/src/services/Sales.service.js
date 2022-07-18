const { Sale, SaleProduct } = require('../database/models');

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
  createSale,
};