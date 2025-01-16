const { quote } = require("@mengkodingan/ckptw");


module.exports = {
    name: "report",
    aliases: ["saran", "kritik", "lapor"],
    category: "information",
    code: async (ctx) => {
        // Ambil pesan yang dikirim setelah command
        const reportMessage = ctx.args.join(" ");
        
        // Validasi: jika tidak ada pesan yang disampaikan
        if (!reportMessage) {
            return await ctx.reply(quote("❌ Mohon sertakan pesan yang ingin Anda laporkan!"));
        }

        // Nomor owner dari config
        const ownerNumber = config.owner.number;
        if (!ownerNumber) {
            return await ctx.reply(quote("❌ Nomor owner belum dikonfigurasi di bot."));
        }

        // Kirim pesan ke owner
        try {
            await ctx._client.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                text: quote(
                    `📢 *Laporan dari pengguna*\n\n` +
                    `👤 *Pengirim*: ${ctx.sender.pushname || ctx.sender.jid.split("@")[0]}\n` +
                    `💌 *Pesan*: ${reportMessage}\n\n` +
                    `💡 *Catatan*: Balas pengguna jika diperlukan.`
                ),
            });

            // Konfirmasi ke pengguna bahwa pesan telah dikirim
            return await ctx.reply(quote(`✅ Laporan Anda telah berhasil dikirim ke Owner ${config.owner.name}!`));
        } catch (error) {
            console.error(`[Report Error]:`, error);
            return await ctx.reply(quote("⚠️ Terjadi kesalahan saat mengirim laporan. Silakan coba lagi nanti."));
        }
    },
};