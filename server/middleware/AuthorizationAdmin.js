const AuthorizationAdmin = async (req, res, next) => {
  try {
    // Mengecek apakah user memiliki posisi 'Admin'
    if (req.user && req.user.position === 'Admin') {
      return next(); // Melanjutkan jika user adalah admin
    } 
    throw { name: 'Forbidden', message: 'Access denied: Admins only' }; // Jika bukan admin, lempar error
  } catch (error) {
    next(error); // Meneruskan error ke middleware penanganan error
  }
};

module.exports = AuthorizationAdmin;
