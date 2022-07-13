"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "johndoe@test.com",
          password: "123456",
          role: "customer",
        },
        {
          name: "Peter Pan",
          email: "peterpan@test.com",
          password: "1234567",
          role: "customer",
        },
        {
          name: "Dona Tereza",
          email: "donatereza@test.com",
          password: "12345678",
          role: "administrator",
        },
        {
          name: "Zé das Coves",
          email: "zedascoves@test.com",
          password: "123456789",
          role: "seller",
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
