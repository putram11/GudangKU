const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const Authentication = async (req, res, next) => {
  
  try {
    const authHeader = req.headers["authorization"];
   
    if (!authHeader) throw { name: "Unauthorized" };

    const token = authHeader.split(" ")[1];
    if (!token) throw { name: "Unauthorized" };
  

    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    if (!user) throw { name: "Unauthorized" };

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = Authentication;
