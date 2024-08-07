const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jsonwebtoken");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      if (!email || !password) throw { name: "InvalidInput" };

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      const { password: _, ...userData } = user.toJSON();

      res.status(201).json(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "InvalidInput" };

      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) throw { name: "InvalidInput" };

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw error;
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token: token, id: user.id });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = UserController;
