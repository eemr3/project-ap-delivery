const Joi = require('joi');

const validRegister = Joi.object({
    name: Joi.string().max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
})

module.exports = {
    validRegister,
}