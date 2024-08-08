const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const GoodsController = require("../controllers/goods");
const CategoryController = require("../controllers/Categories");
const RequestController = require("../controllers/request");

const Authentication = require("../middleware/authentication");
const AuthorizationAdmin = require("../middleware/AuthorizationAdmin");


router.post("/login", UserController.login);
router.get("/cat", CategoryController.getAllCategories);
router.get("/goods", GoodsController.getAllGoods);
router.post("/request", Authentication, RequestController.request);
router.post("/adduser", AuthorizationAdmin, UserController.addUser);
router.post("/create", AuthorizationAdmin, GoodsController.createGood);
router.put("/goods/:id", AuthorizationAdmin, GoodsController.updateGood);
router.delete("/goods/:id", AuthorizationAdmin, GoodsController.deleteGood);

module.exports = router;
