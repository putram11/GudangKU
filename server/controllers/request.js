const { User, Good, Log } = require("../models");
const  emailjs  = require("emailjs-com");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Misalkan Anda menggunakan library Google Generative AI yang benar
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body;

    try {
      const total = goods.reduce((acc, item) => acc + item.numberOfItems, 0);

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

      // Generate email content using Google Generative AI
      const prompt = `Buat email konfirmasi pesanan dengan tone formal kepada pelanggan. 
      Pesanan dengan nomor ${log.id} telah berhasil diproses. 
      nama pelanggan buat jadi bapak yang terhormat tidak perlu nama
      nama toko menjadi gudangKu
      Rincian pesanan:
      * Deskripsi: ${description}
      * Tipe: ${type}
      * Total Barang: ${total}
      * Detail Barang: ${JSON.stringify(goods)}

      Mohon konfirmasi penerimaan email ini. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.`;

      const result = await model.generateContent(prompt)

      const response = await result.response; // Adjust based on the actual response structure
      const emailContent = response.text();
      console.log(emailContent)
      

      // Send email using emailjs
      await emailjs.send(
        "service_41li2l4", // Service ID
        "template_1wo1wx3", // Template ID
        {
          to_name: req.user.name,
          message: emailContent,
          user_email: "putra.mahardika.17@gmail.com",
        },
        "gFSJU4gxY50qbAO7x" // User ID from EmailJS
      );

      res.status(200).json(log);
    } catch (error) {
      console.log(error)
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
