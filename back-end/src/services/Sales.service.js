const { Sale } = require('../database/models');

const createSales = async (sale) => {
    const {totalPrice, deliveryAddress, deliveryNumber} = sale;

    const sales = {
        totalPrice,
        deliveryAddress,
        deliveryNumber
    };

    const createdSales = await Sale.create({
        ...sales,
    })

    if (!createSales) throw ErrorBase(500,'Internal server error');

    return {
        sales,
    };
};

module.exports = {
    createSales,
};