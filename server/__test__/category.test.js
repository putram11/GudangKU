// tests/CategoryController.test.js
const request = require('supertest');
const { app } = require('../app'); // Adjust path to your app file
const { sequelize, Category, Good } = require('../models'); // Adjust path to your models

beforeAll(async () => {
  // Sync the database before tests
  await sequelize.sync({ force: true });

  // Seed the database with test data
  await Category.create({
    name: 'Electronics',
    Goods: [{ name: 'iPhone 12', numberOfItems: 300, price: 799 }],
  }, {
    include: [Good]
  });

  await Category.create({
    name: 'Books',
    Goods: [{ name: 'The Great Gatsby', numberOfItems: 50, price: 10 }],
  }, {
    include: [Good]
  });
});

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
});

describe('CategoryController', () => {
  describe('GET /categories', () => {
    it('should return all categories with associated goods', async () => {
      const response = await request(app).get('/categories');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);

      const [category1, category2] = response.body;

      expect(category1).toHaveProperty('name', 'Electronics');
      expect(category1.Goods).toBeInstanceOf(Array);
      expect(category1.Goods[0]).toHaveProperty('name', 'iPhone 12');

      expect(category2).toHaveProperty('name', 'Books');
      expect(category2.Goods).toBeInstanceOf(Array);
      expect(category2.Goods[0]).toHaveProperty('name', 'The Great Gatsby');
    });

    it('should handle errors', async () => {
      // Simulate an error
      jest.spyOn(Category, 'findAll').mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/categories');
      
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });
});
