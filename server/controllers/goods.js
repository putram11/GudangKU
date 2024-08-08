const { Op } = require("sequelize");
const { Good, Category } = require("../models");

class GoodsController {
  static async getAllGoods(req, res, next) {
    try {
      const { search, categoryId } = req.query;
      console.log(req.query)
      const whereConditions = {};

      if (search) {
        whereConditions.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      if (categoryId) {
        whereConditions.CategoryId = categoryId;
      }

      const goods = await Good.findAll({
        where: whereConditions,
        include: {
          model: Category,
          attributes: ["name"],
        },
      });

      res.status(200).json(goods);

    } catch (error) {
      next(error);
    }
  }

  static async getGoodById(req, res, next) {
    const { id } = req.params;
    try {
      const good = await Good.findByPk(id, {
        include: {
          model: Category,
          attributes: ["name"],
        },
      });

      if (!good) throw { name: "NotFoundError" };

      res.status(200).json(good);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createGood(req, res, next) {
    const { name, numberOfItems, price, CategoryId } = req.body;
    try {
      const newGood = await Good.create({
        name,
        numberOfItems,
        price,
        CategoryId,
      });
      res.status(201).json(newGood);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateGood(req, res, next) {
    const { id } = req.params;
    const { name, numberOfItems, price, CategoryId } = req.body;
    try {
      const good = await Good.findByPk(id);
      if (!good) throw { name: "NotFoundError" };
      await good.update({ name, numberOfItems, price, CategoryId });
      res.status(200).json(good);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGood(req, res) {
    const { id } = req.params;
    try {
      const good = await Good.findByPk(id);
      if (!good) throw { name: "NoDataProvided" };
      await good.destroy();
      res.status(204).json({ message: "Good deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GoodsController;
