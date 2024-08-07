const { User, Good, Log } = require("../models");

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body;
    const userId = req.user.id;

    try {
      const total = goods.reduce(
        (acc, item) => acc + item.price * item.numberOfItems,
        0
      );

      for (const item of goods) {
        const good = await Good.findOne({ where: { name: item.name } });
        if (!good) throw { name: "NotFoundError" };

        if (type === "outgoing") {
          if (good.numberOfItems < item.numberOfItems) {
            return res
              .status(400)
              .json({ message: `Not enough items for ${item.name}` });
          }
          good.numberOfItems -= item.numberOfItems;
        } else if (type === "incoming") {
          good.numberOfItems += item.numberOfItems;
        }
        await good.save();
      }

      const log = await Log.create({
        description,
        goods,
        total,
        userId,
      });

      res.status(201).json(log);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RequestController;
