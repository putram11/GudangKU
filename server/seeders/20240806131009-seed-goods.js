const fs = require("fs");
const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require("../data/good.json").map((el) => {
      const { name, price, CategoryId } = el;
      return {
        name: el.name,
        numberOfItems: 300,
        price: el.price, 
        CategoryId: el.CategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    // console.log(data)
    await queryInterface.bulkInsert("Goods", data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Goods", null, {});
  },
};
