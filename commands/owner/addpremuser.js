const { quote } = require("@mengkodingan/ckptw");

module.exports = {
    name: "suit",
    aliases: ["game"],
    category: "games",
    code: async (ctx) => {
        const mentionedJids = ctx.msg?.message?.extendedTextMessage?.contextInfo?.mentionedJid;

        // Pastikan ada 1 orang yang dimention
        if (!Array.isArray(mentionedJids) || mentionedJids.length !== 1) {
            return await ctx.reply(quote(`❌ Harap mention 1 orang untuk bermain!`));
        }

        // Mendapatkan ID user 1 (pengirim) dan user 2 (yang dimention)
        const user1 = ctx.sender.jid.split("@")[0];
        const user2 = mentionedJids[0].split("@")[0];

        // Daftar pilihan batu-gunting-kertas
        const options = ["batu", "gunting", "kertas"];

        // Pilihan acak untuk kedua pemain
        const user1Choice = options[Math.floor(Math.random() * options.length)];
        const user2Choice = options[Math.floor(Math.random() * options.length)];

        // Logika penentuan pemenang
        let result;
        if (user1Choice === user2Choice) {
            result = "🤝 Hasil seri!";
        } else if (
            (user1Choice === "batu" && user2Choice === "gunting") ||
            (user1Choice === "gunting" && user2Choice === "kertas") ||
            (user1Choice === "kertas" && user2Choice === "batu")
        ) {
            result = `🎉 @${user1} menang!`;
        } else {
            result = `🎉 @${user2} menang!`;
        }

        // Kirim hasil permainan ke grup
        await ctx.reply({
            text: `🕹️ *Game Batu-Gunting-Kertas*\n\n` +
                `👤 @${user1} : ${user1Choice}\n` +
                `👤 @${user2} : ${user2Choice}\n\n` +
                `${result}`,
            mentions: [ctx.sender.jid, mentionedJids[0]] // Mention kedua pemain
        });
    }
};