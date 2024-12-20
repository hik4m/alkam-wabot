const { quote } = require("@mengkodingan/ckptw");
const mime = require("mime-types");

module.exports = {
  name: "tweetgen",
  aliases: ["tweetgenerator", "twitgen"],
  category: "maker",
  handler: {
    coin: [10, "text", 1],
  },
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    // Menggabungkan argumen pengguna
    const input = ctx.args.join(" ") || null;

    // Validasi input
    if (!input || !input.includes("|")) {
      return await ctx.reply(
        `${quote("Format salah! Gunakan format berikut:")}\n` +
          quote(
            tools.msg.generateCommandExample(
              ctx._used.prefix + ctx._used.command,
              "Name | Username | Messages"
            )
          )
      );
    }

    // Memisahkan input berdasarkan pemisah "|"
    const [name, username, ...messageParts] = input
      .split("|")
      .map((v) => v.trim());
    const message = messageParts.join(" ");

    // Validasi komponen input
    if (!name || !username || !message) {
      return await ctx.reply(
        `${quote("Semua parameter wajib diisi!")}\n` +
          quote(
            tools.msg.generateCommandExample(
              ctx._used.prefix + ctx._used.command,
              "Name | Username | Message"
            )
          )
      );
    }

    try {
      // URL API dengan parameter
      const apiUrl = tools.api.createUrl("siputzx", "/api/m/tweet", {
        name,
        username: username,
        tweet: message,
      });

      // Kirim hasil
      return await ctx.reply({
        image: {
          url: apiUrl,
        },
        mimetype: mime.lookup("png") || "image/png",
      });
    } catch (error) {
      console.error(`[${config.pkg.name}] Error:`, error);
      if (error.status !== 200) return await ctx.reply(config.msg.notFound);
      return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
    }
  },
};
