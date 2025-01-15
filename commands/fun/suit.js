const { quote } = require("@mengkodingan/ckptw");

module.exports = {
    name: "suit",
    category: "fun",
    handler: {
     group: true, 
},
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const mentions = ctx.message.mentionedJid || [];
        if (mentions.length !== 1) {
            return await ctx.reply(quote("❌ Harap mention 1 orang untuk bermain Batu Gunting Kertas!"));
        }

        const user1 = ctx.sender.jid.split(/[:@]/)[0];
        const user2 = mentions[0].split(/[:@]/)[0];

        // Pilihan acak untuk kedua user
        const choices = ["batu", "gunting", "kertas"];
        const user1Choice = choices[Math.floor(Math.random() * choices.length)];
        const user2Choice = choices[Math.floor(Math.random() * choices.length)];

        // Fungsi untuk menentukan pemenang
        const getWinner = (choice1, choice2) => {
            if (choice1 === choice2) return "Seri";
            if (
                (choice1 === "batu" && choice2 === "gunting") ||
                (choice1 === "gunting" && choice2 === "kertas") ||
                (choice1 === "kertas" && choice2 === "batu")
            ) {
                return "user1";
            }
            return "user2";
        };

        const winner = getWinner(user1Choice, user2Choice);

        let resultMessage = `👊 Game Batu Gunting Kertas 👊\n\n`;
        resultMessage += `📌 ${ctx.sender.pushName} (User 1): ${user1Choice}\n`;
        resultMessage += `📌 ${ctx.message.extendedTextMessage.contextInfo.mentionedJid[0]} (User 2): ${user2Choice}\n\n`;

        if (winner === "Seri") {
            resultMessage += "🤝 Hasil: Seri! Tidak ada pemenang.";
        } else if (winner === "user1") {
            resultMessage += `🎉 Hasil: ${ctx.sender.pushName} (User 1) menang!`;
        } else {
            resultMessage += `🎉 Hasil: ${ctx.message.extendedTextMessage.contextInfo.mentionedJid[0]} (User 2) menang!`;
        }

        return await ctx.reply(quote(resultMessage));
    },
};