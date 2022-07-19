const RegisterService = require('../services/Register.service');

const createRegister = async (req, res) => {
    const userInfo = req.body;
    const createdUser = await RegisterService.createRegister(userInfo);

    return res.status(201).json(createdUser);
};

module.exports = {
  createRegister,
};