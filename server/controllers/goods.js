const { Good } = require("../models");

class GoodsController {

  static async createGood(req, res) {
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
      res.status(400).json({ message: error.message });
    }
  }
 
  static async updateGood(req, res) {
    const { id } = req.params;
    const { name, numberOfItems, price, CategoryId } = req.body;
    try {
      const good = await Good.findByPk(id);
      if (!good) {
        return res.status(404).json({ message: "Good not found" });
      }
      await good.update({ name, numberOfItems, price, CategoryId });
      res.status(200).json(good);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteGood(req, res) {
    const { id } = req.params;
    try {
      const good = await Good.findByPk(id);
      if (!good) {
        return res.status(404).json({ message: "Good not found" });
      }
      await good.destroy();
      res.status(204).json({ message: "Good deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = GoodsController;
