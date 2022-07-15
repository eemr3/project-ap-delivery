"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "johndoe@test.com",
          password: "$2a$12$cektvgvtIEmOUA3VkLAfC.yKOpPuOtb38e13PcTbqGyrOb4lHFz.G", //senha: 123456
          role: "customer",
        },
        {
          name: "Peter Pan",
          email: "peterpan@test.com",
          password: "$2a$10$2L23DzVelr6iFnFONTJd8.nYhf3VUz6AwjjBD09TebpmSYMKr.ZIq", //senha: 1234567
          role: "customer",
        },
        {
          name: "Dona Tereza",
          email: "donatereza@test.com",
          password: "$2a$10$WSDszvJDWZ6SIIEhG7TQEuwHtH.KRAgfvmh8kBKwNHH5lrEqcr77W", //senha: 12345678
          role: "administrator",
        },
        {
          name: "Zé das Coves",
          email: "zedascoves@test.com",
          password: "$2a$10$.fxQUHrhSwZQajUjbjvmgOnw7sVt9nlRMxsXqyrCHT4OBSfcSqjeW", // senha: 123456789
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
