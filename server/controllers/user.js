const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  // Fungsi untuk menambah user baru
  static async addUser(req, res, next) {
    try {
      const { email, password, name, position, phoneNumber } = req.body;

      // Validasi input
      if (!email || !password) throw { name: 'InvalidInput', message: 'Email and password are required.' };

      // Membuat user baru
      const user = await User.create({ email, password, name, position, phoneNumber });

      // Menghilangkan password dari response
      const { password: _, ...userData } = user.toJSON();

      res.status(201).json(userData);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Fungsi untuk login user
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) throw { name: 'InvalidInput', message: 'Email and password are required.' };

      // Mencari user berdasarkan email
      const user = await User.findOne({ where: { email } });

      if (!user) throw { name: 'InvalidInput', message: 'Invalid email or password.' };

      // Membandingkan password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) throw { name: 'InvalidInput', message: 'Invalid email or password.' };

      // Membuat token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token: token, id: user.id, role: user.position });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // Fungsi untuk login menggunakan Google
  static async googleLogin(req, res, next) {
    const { credential } = req.body;
    
    try {
      // Verifikasi token Google
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();

      // Mencari user berdasarkan email, atau membuat user baru
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          email,
          password: '123456', // Password default
          name,
          position: 'Staff',
          phoneNumber: '123456789', // Nomor default
        });
      }

      // Membuat token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token: token, id: user.id, role: user.position });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UserController;
