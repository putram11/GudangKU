const { User, Good, Log } = require("../models");

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body;

    try {
      const total = goods.reduce((acc, item) => acc + item.numberOfItems, 0);

      for (const item of goods) {
        const good = await Good.findOne({ where: { name: item.name } });
        if (!good) throw { name: "NotFoundError" };

        if (type === "outgoing") {
          if (good.numberOfItems < item.numberOfItems)
            throw { name: "No stock" };
          good.numberOfItems -= item.numberOfItems;
        } else if (type === "incoming") {
          Number(good.numberOfItems += item.numberOfItems);
        }
        await good.save();
      }


      const log = await Log.create({
        description,  
        goods,
        type,
        total,
        userId: req.user.id,
      });

      res.status(201).json(log);
    } catch (error) {
      console.log("ini error",error);
      next(error);
    }
  }

  static async getAllLogs(req, res, next) {
    try {
      const logs = await Log.findAll();
      res.status(200).json(logs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RequestController;
