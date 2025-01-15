const { quote } = require("@mengkodingan/ckptw");

module.exports = {
    name: "suit",
    category: "fun",
    handler: {
   group: true, 
},
    code: async (ctx) => {
        const choices = ["batu", "gunting", "kertas"];
        const mentions = ctx.mentionedJidList || [];
        
        if (!mentions || mentions.length !== 1) {
            return await ctx.reply(quote("❌ Harap mention 1 orang untuk bermain!"));
        }

        const user1 = ctx.sender.jid.split("@")[0];
        const user2 = mentions[0].split("@")[0];

        const user1Choice = choices[Math.floor(Math.random() * choices.length)];
        const user2Choice = choices[Math.floor(Math.random() * choices.length)];

        let result;
        if (user1Choice === user2Choice) {
            result = "🤝 Hasilnya seri!";
        } else if (
            (user1Choice === "batu" && user2Choice === "gunting") ||
            (user1Choice === "gunting" && user2Choice === "kertas") ||
            (user1Choice === "kertas" && user2Choice === "batu")
        ) {
            result = `🎉 ${user1} menang!`;
        } else {
            result = `🎉 ${user2} menang!`;
        }

        return await ctx.reply(
            quote(`Hasil Suit:\n${user1}: ${user1Choice}\n${user2}: ${user2Choice}\n${result}`)
        );
    },
};