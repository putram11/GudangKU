'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require("../data/category.json").map((el) => {
      const { ...rest } = el;
      return {
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    // console.log(data)
    await queryInterface.bulkInsert("Categories", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
