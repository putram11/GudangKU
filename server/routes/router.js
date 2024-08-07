const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const GoodsController = require("../controllers/goods");
const RequestController = require("../controllers/request");

const authentication = require("../middleware/authentication");

router.use("/user", userRouter);
router.use("/pub", pubRouter);
router.use("/categories", authentication, categoryRouter);
router.use("/articles", authentication, articleRouter);

module.exports = router;
