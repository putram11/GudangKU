const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const Authentication = async (req, res, next) => {
  try {
    // Mengambil header authorization
    const authHeader = req.headers["authorization"];

    // Memastikan header authorization ada
    if (!authHeader) {
      throw { name: "Unauthorized", message: "Authorization header missing" };
    }

    // Memisahkan token dari header
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw { name: "Unauthorized", message: "Token missing" };
    }

    // Memverifikasi token
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);

    // Memastikan user ada
    if (!user) {
      throw { name: "Unauthorized", message: "User not found" };
    }

    // Menyimpan informasi user di request
    req.user = user;
    next(); // Melanjutkan ke middleware berikutnya
  } catch (error) {
    console.log(error);
    next(error); // Meneruskan error ke middleware penanganan error
  }
};

module.exports = Authentication;
