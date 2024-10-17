const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/user");
const GoodsController = require("../controllers/goods");
const CategoryController = require("../controllers/Categories");
const RequestController = require("../controllers/request");

// Middleware
const Authentication = require("../middleware/authentication");
const AuthorizationAdmin = require("../middleware/AuthorizationAdmin");

// User Routes
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/adduser", Authentication, AuthorizationAdmin, UserController.addUser);

// Category Routes
router.get("/cat", CategoryController.getAllCategories);

// Goods Routes
router.get("/goods", GoodsController.getAllGoods);
router.get("/goods/:id", GoodsController.getGoodById);
router.post("/create", Authentication, AuthorizationAdmin, GoodsController.createGood);
router.put("/goods/:id", Authentication, AuthorizationAdmin, GoodsController.updateGood);
router.delete("/goods/:id", Authentication, AuthorizationAdmin, GoodsController.deleteGood);

// Request Routes
router.get("/logs", RequestController.getAllLogs);
router.post("/request", Authentication, RequestController.request);

module.exports = router;
