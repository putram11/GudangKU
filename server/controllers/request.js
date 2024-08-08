const { User, Good, Log } = require("../models");

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body;
  
    try {
      // Menghitung total barang
      const total = goods.reduce((acc, item) => acc + item.numberOfItems, 0);
  
      // Proses setiap barang
      for (const item of goods) {
        const good = await Good.findOne({ where: { name: item.name } });
        if (!good) throw { name: "NotFoundError" };
  
        const numberOfItems = Number(item.numberOfItems);
  
        if (isNaN(numberOfItems)) {
          throw { name: "InvalidNumber" }; 
        }
  
        if (type === "outgoing") {
          if (good.numberOfItems < numberOfItems) {
            throw { name: "NoStockError" };
          }
          good.numberOfItems -= numberOfItems;
        } else if (type === "incoming") {
          good.numberOfItems += numberOfItems;
        }
        await good.save();
      }
  
      // Simpan log
      const log = await Log.create({
        description,
        goods,
        type,
        total,
        userId: req.user.id,
      });
  
      res.status(200).json(log);
    } catch (error) {
      next(error);
    }
  }  

  static async getAllLogs(req, res, next) {
    try {
      const logs = await Log.findAll({
        order: [["createdAt", "DESC"]],
        limit: 15,
      });
      res.status(200).json(logs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } 
}

module.exports = RequestController;
