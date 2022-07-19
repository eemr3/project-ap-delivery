const Joi = require('joi');

const validSales = Joi.object({
    products: Joi.array().items(
        Joi.object({ id: Joi.number().required(), quantity: Joi.number().required() }),
    ).required(),
    sellerId: Joi.number().required(),
    deliveryAddress: Joi.string().required(),
    deliveryNumber: Joi.number().required(),
    totalPrice: Joi.number().required(),
});

const validStatus = Joi.object({
  status: Joi.string().required(),
});

module.exports = {
  validSales,
  validStatus,
};