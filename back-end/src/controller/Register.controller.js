const RegisterService = require('../services/Register.service');

const createRegister = async (req, res) => {
    const userInfo = req.body;
    const createdUser = await RegisterService.createRegister(userInfo);

    return res.status(201).json(createdUser);
};

const deleteRegister = async (req, res) => {
    const { id } = req.params;
    const deletedUser = await RegisterService.deleteRegister(id);

    return res.status(200).json(deletedUser);
};

module.exports = {
  createRegister,
  deleteRegister,
};