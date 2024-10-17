const { Op } = require('sequelize');
const { Good, Category } = require('../models');

class GoodsController {
  static async getAllGoods(req, res, next) {
    try {
      const { search, categoryId } = req.query;
      const whereConditions = {};

      // Search by name using iLike for case-insensitive matching
      if (search) {
        whereConditions.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      // Filter by category if provided
      if (categoryId) {
        whereConditions.CategoryId = categoryId;
      }

      const goods = await Good.findAll({
        where: whereConditions,
        include: {
          model: Category,
          attributes: ['name'],
        },
      });

      res.status(200).json(goods);
    } catch (error) {
      next(error);
    }
  }

  static async getGoodById(req, res, next) {
    try {
      const { id } = req.params;

      const good = await Good.findByPk(id, {
        include: {
          model: Category,
          attributes: ['name'],
        },
      });

      if (!good) {
        throw { name: 'NotFoundError', message: 'Good not found' };
      }

      res.status(200).json(good);
    } catch (error) {
      next(error);
    }
  }

  static async createGood(req, res, next) {
    try {
      const { name, numberOfItems, price, CategoryId } = req.body;

      const newGood = await Good.create({
        name,
        numberOfItems,
        price,
        CategoryId,
      });

      res.status(201).json(newGood);
    } catch (error) {
      next(error);
    }
  }

  static async updateGood(req, res, next) {
    try {
      const { id } = req.params;
      const { name, numberOfItems, price, CategoryId } = req.body;

      const good = await Good.findByPk(id);

      if (!good) {
        throw { name: 'NotFoundError', message: 'Good not found' };
      }

      await good.update({ name, numberOfItems, price, CategoryId });
      res.status(200).json(good);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGood(req, res, next) {
    try {
      const { id } = req.params;

      const good = await Good.findByPk(id);

      if (!good) {
        throw { name: 'NoDataProvided', message: 'Good not found' };
      }

      await good.destroy();
      res.status(204).json({ message: 'Good deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GoodsController;
