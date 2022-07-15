const Joi = require('joi');

const validProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  urlImage: Joi.string().required(),
});

module.exports = {
  validProduct,
};