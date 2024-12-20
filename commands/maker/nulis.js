const { quote } = require("@mengkodingan/ckptw");
const mime = require("mime-types");

module.exports = {
  name: "nulis",
  aliases: ["nulis"],
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
              "Nama | Kelas | Pesan"
            )
          )
      );
    }

    // Memisahkan input berdasarkan pemisah "|"
    const [name, classInput, ...messageParts] = input
      .split("|")
      .map((v) => v.trim());
    const message = messageParts.join(" ");

    // Validasi komponen input
    if (!name || !classInput || !message) {
      return await ctx.reply(
        `${quote("Semua parameter wajib diisi!")}\n` +
          quote(
            tools.msg.generateCommandExample(
              ctx._used.prefix + ctx._used.command,
              "Nama | Kelas | Pesan"
            )
          )
      );
    }

    // Fungsi untuk memecah teks menjadi baris-baris pendek
    const formatText = (text, maxLineLength) => {
      const words = text.split(" ");
      let lines = [];
      let currentLine = "";

      for (const word of words) {
        if ((currentLine + word).length <= maxLineLength) {
          currentLine += `${word} `;
        } else {
          lines.push(currentLine.trim());
          currentLine = `${word} `;
        }
      }
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      return lines.join("\n");
    };

    // Membatasi panjang baris (contoh: 35 karakter per baris)
    const formattedMessage = formatText(message, 35);

    try {
      // URL API dengan parameter
      const apiUrl = tools.api.createUrl("siputzx", "/api/m/nulis", {
        name,
        class: classInput,
        text: formattedMessage,
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
