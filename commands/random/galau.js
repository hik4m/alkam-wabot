const { quote } = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
  name: "galau",
  category: "random",
  handler: {
    coin: 50,
  },
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    const apiUrl = tools.api.createUrl("vreden", `/api/galau`);

    try {
      // Panggil API dan terima file biner
      const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

      // Kirimkan file video langsung
      await ctx.reply({
        video: Buffer.from(response.data),
        mimetype: "video/mp4",
        caption: "Tuh videonya tuan",
      });
    } catch (error) {
      console.error(`[${config.pkg.name}] Error:`, error);

      // Tanggapan jika terjadi kesalahan
      if (error.response && error.response.status !== 200) {
        return await ctx.reply(config.msg.notFound);
      }
      return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
    }
  },
};
