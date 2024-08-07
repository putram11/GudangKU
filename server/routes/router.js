const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const GoodsController = require("../controllers/goods");
const CategoryController = require("../controllers/Categories");
const RequestController = require("../controllers/request");

const authentication = require("../middleware/authentication");

router.post("/login", UserController.login);
router.post("/adduser", UserController.addUser);
router.post("/request", RequestController.request);
router.get("/goods", GoodsController.getAllGoods);
router.get("/cat", CategoryController.getAllCategories);
router.post("/create", GoodsController.createGood);
router.put("/goods/:id", GoodsController.updateGood);
router.delete("/goods/:id", GoodsController.deleteGood);

module.exports = router;
