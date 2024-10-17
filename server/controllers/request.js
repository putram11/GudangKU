const { User, Good, Log } = require('../models');
const emailjs = require('emailjs-com');
global.XMLHttpRequest = require('xhr2');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Inisialisasi Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

class RequestController {
  static async request(req, res, next) {
    const { description, goods, type } = req.body;

    try {
      // Menghitung total jumlah barang
      const total = goods.reduce((acc, item) => acc + item.numberOfItems, 0);

      // Looping untuk setiap barang
      for (const item of goods) {
        const good = await Good.findOne({ where: { name: item.name } });
        if (!good) throw { name: 'NotFoundError', message: `Good '${item.name}' not found.` };

        const numberOfItems = Number(item.numberOfItems);

        // Validasi jumlah barang
        if (isNaN(numberOfItems)) throw { name: 'InvalidNumber', message: 'Invalid number of items.' };

        // Proses stok barang tergantung tipe transaksi
        if (type === 'outgoing') {
          if (good.numberOfItems < numberOfItems) throw { name: 'NoStockError', message: 'Not enough stock.' };
          good.numberOfItems -= numberOfItems;
        } else if (type === 'incoming') {
          good.numberOfItems += numberOfItems;
        }

        // Simpan perubahan stok
        await good.save();
      }

      // Simpan log transaksi
      const log = await Log.create({
        description,
        goods,
        type,
        total,
        userId: req.user.id,
      });

      // Membuat email menggunakan Google Generative AI
      const prompt = `Buat email konfirmasi pesanan dengan tone formal kepada pelanggan. 
        Pesanan dengan nomor ${log.id} telah berhasil diproses.
        Nama pelanggan: "Bapak yang Terhormat"
        Nama toko: "GudangKu"
        Rincian pesanan:
        * Deskripsi: ${description}
        * Tipe: ${type}
        * Total Barang: ${total}
        * Detail Barang: ${JSON.stringify(goods)}
        
        Mohon konfirmasi penerimaan email ini. Jika ada pertanyaan, jangan ragu untuk menghubungi kami.`;

      const result = await model.generateContent(prompt);
      const emailContent = result.response.text();  // Menyesuaikan dengan struktur response

      // Mengirim email menggunakan emailjs
      await emailjs.send(
        'service_41li2l4', // Service ID
        'template_1wo1wx3', // Template ID
        {
          to_name: req.user.name,
          message: emailContent,
          user_email: 'putra.mahardika.17@gmail.com',
        },
        'gFSJU4gxY50qbAO7x', // Public Key
      );

      res.status(200).json(log);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getAllLogs(req, res, next) {
    try {
      const logs = await Log.findAll({
        order: [['createdAt', 'DESC']],
        limit: 15,
      });
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = RequestController;
