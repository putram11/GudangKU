const { Category , Good } = require("../models");

class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const category = await Category.findAll({
        include: {
          model: Good,
          attributes: ["name"],
        },
      });
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
