const { User, Good, Log } = require("../models");

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body; // Assume goods is an array of objects {name, numberOfItems, price}
    const userId = req.user.id; // Assume req.user is set after authentication middleware

    try {
      const total = goods.reduce(
        (acc, item) => acc + item.price * item.numberOfItems,
        0
      );

      for (const item of goods) {
        const good = await Good.findOne({ where: { name: item.name } });
        if (!good) {
          return res
            .status(404)
            .json({ message: `Good ${item.name} not found` });
        }

        if (type === "outgoing") {
          if (good.numberOfItems < item.numberOfItems) {
            return res
              .status(400)
              .json({ message: `Not enough items for ${item.name}` });
          }
          good.numberOfItems -= item.numberOfItems;
        } else if (type === "incoming") {
          good.numberOfItems += item.numberOfItems;
        } else {
          return res.status(400).json({ message: "Invalid type" });
        }

        await good.save();
      }

      // Create the log entry
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
