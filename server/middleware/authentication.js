const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  if (!authHeader) throw { name: "Unauthorized" };

  const token = authHeader.split(" ")[1];

  if (!token) throw { name: "Unauthorized" };

  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (!user) throw { name: "Unauthorized" };

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
