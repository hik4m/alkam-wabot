const axios = require("axios");

module.exports = {
  name: "jokes",
  category: "entertainment",
  handler: {
    coin: 10,
  },
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    const apiUrl = "https://official-joke-api.appspot.com/jokes/random";

    try {
      // Mengambil data dari API
      const { data } = await axios.get(apiUrl);

      if (!data || !data.setup || !data.punchline) {
        // Validasi respons API
        return await ctx.reply("⚠️ Tidak dapat menemukan lelucon.");
      }

      // Menggabungkan setup dan punchline
      const joke = `_${data.setup}_\n\n *${data.punchline}*`;

      // Mengirimkan lelucon sebagai balasan
      return await ctx.reply(joke);
    } catch (error) {
      console.error(`[Error]:`, error);

      // Penanganan error
      return await ctx.reply(`⚠️ Terjadi kesalahan: ${error.message}`);
    }
  },
};
