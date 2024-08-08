const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const GoodsController = require("../controllers/goods");
const CategoryController = require("../controllers/Categories");
const RequestController = require("../controllers/request");

const Authentication = require("../middleware/authentication");
const AuthorizationAdmin = require("../middleware/AuthorizationAdmin");

router.post("/login", UserController.login);
router.post("/auth/google", UserController.googleLogin);
router.get("/cat", CategoryController.getAllCategories);
router.get("/goods", GoodsController.getAllGoods);
router.get("/logs", RequestController.getAllLogs);
router.post("/request", Authentication, RequestController.request);
router.post(
  "/adduser",
  Authentication,
  AuthorizationAdmin,
  UserController.addUser
);
router.post(
  "/create",
  Authentication,
  AuthorizationAdmin,
  GoodsController.createGood
);
router.get("/goods/:id", GoodsController.getGoodById);
router.put(
  "/goods/:id",
  Authentication,
  AuthorizationAdmin,
  GoodsController.updateGood
);
router.delete(
  "/goods/:id",
  Authentication,
  AuthorizationAdmin,
  GoodsController.deleteGood
);

module.exports = router;
