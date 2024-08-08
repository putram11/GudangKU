const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const AuthorizationAdmin = async (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  if (!authHeader) throw { name: "Unauthorized" };

  const token = authHeader.split(" ")[1];

  if (!token) throw { name: "Unauthorized" };

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) throw { name: "Unauthorized" };

    const user = await User.findByPk(decoded.id);

    if (!user) throw { name: "Unauthorized" };

    if (user.role === "Admin") {
      req.user = user;
      return next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationAdmin;
