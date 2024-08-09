const request = require("supertest");
const app = require("../app.js");
const { sequelize, Good, Category } = require("../models");
const { queryInterface } = sequelize;

let accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwdXRyYS5tYWhhcmRpa2EuMTdAZ21haWwuY29tIiwiaWF0IjoxNzIzMTY3NTgwfQ.VzHvq1NRsEFUinVoJzvIQRwzgofPeyGPuTltGGPM3HE";

beforeAll(async () => {
  await Category.create({ name: "Electronics" });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Goods", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Goods Routes Test", () => {
  describe("GET /goods - get all goods", () => {
    test("200 Success - should return an array of goods", async () => {
      const response = await request(app).get("/goods");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe("POST /create - create new good", () => {
    test("201 Success - should create a new good", async () => {
      const newGood = {
        name: "Smartphone",
        numberOfItems: 10,
        price: 1000,
        CategoryId: 1,
      };

      const response = await request(app)
        .post("/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(newGood);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("name", newGood.name);
    });

    test("400 Failed - should return error when required fields are missing", async () => {
      const newGood = {
        numberOfItems: 10,
        price: 1000,
      };

      const response = await request(app)
        .post("/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(newGood);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /goods/:id - get good by id", () => {
    test("200 Success - should return a single good by ID", async () => {
      const response = await request(app).get("/goods/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
    });

    test("404 Failed - should return error if good not found", async () => {
      const response = await request(app).get("/goods/999");
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "NotFoundError");
    });
  });

  describe("PUT /goods/:id - update good by id", () => {
    test("200 Success - should update a good", async () => {
      const updatedGood = {
        name: "Smart TV",
        numberOfItems: 5,
        price: 1500,
        CategoryId: 1,
      };

      const response = await request(app)
        .put("/goods/1")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(updatedGood);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", updatedGood.name);
    });

    test("404 Failed - should return error if good not found", async () => {
      const updatedGood = {
        name: "Smart TV",
        numberOfItems: 5,
        price: 1500,
        CategoryId: 1,
      };

      const response = await request(app)
        .put("/goods/999")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(updatedGood);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "NotFoundError");
    });
  });

  describe("DELETE /goods/:id - delete good by id", () => {
    test("204 Success - should delete a good by ID", async () => {
      const response = await request(app)
        .delete("/goods/1")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(204);
    });

    test("401 Failed - should return error if good not found", async () => {
      const response = await request(app)
        .delete("/goods/999")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "NoDataProvided");
    });
  });
});
