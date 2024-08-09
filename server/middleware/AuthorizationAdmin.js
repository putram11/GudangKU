
const AuthorizationAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.position === "Admin") {
      return next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationAdmin;
