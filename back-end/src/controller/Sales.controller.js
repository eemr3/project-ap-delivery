const SalesService = require('../services/Register.service');

const createSales = async (req, res) => {
    const sale = req.body;
    const createdSales = await SalesService.createSales(sale);

    return res.status(201).json(createdSales);
};

module.exports = {
    createSales,
};