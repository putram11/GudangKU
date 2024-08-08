const { User } = require("../models");
const { comparePassword } = require("../helpers/brycpt");
const { generateToken } = require("../helpers/jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async addUser(req, res, next) {
    try {
      const { email, password, name, position, phoneNumber } = req.body;

      if (!email || !password) throw { name: "InvalidInput" };

      const user = await User.create({
        email,
        password,
        name,
        position,
        phoneNumber,
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
      console.log(req.body);

      if (!email || !password) throw { name: "InvalidInput" };

      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) throw { name: "InvalidInput" };

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) throw { name: "InvalidInput" };

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res
        .status(200)
        .json({ access_token: token, id: user.id, role: user.position });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { credential } = req.body;

      // Verify the Google token
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { email, name } = payload;

      // Check if user exists in the database
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          email,
          password: "123456",
          name,
          position: "Staff",
          phoneNumber: "231231231231",
        });
      }

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res
        .status(200)
        .json({ access_token: token, id: user.id, role: user.position });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
