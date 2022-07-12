'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      sale_id: {
        foreignKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_id: {
        foreignKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.NUMBER
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('salesProducts');
  }
};