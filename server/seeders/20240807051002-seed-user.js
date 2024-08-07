"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "putra.mahardika.17@gmail.com",
          password: hashedPassword,
          name: "Putra",
          position: "Admin",
          phoneNumber: "1234567890",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user1@example.com",
          password: hashedPassword,
          name: "Budi",
          position: "Staff",
          phoneNumber: "1234567891",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user2@example.com",
          password: hashedPassword,
          name: "Bowo",
          position: "Staff",
          phoneNumber: "1234567892",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
