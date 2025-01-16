const { quote } = require("@mengkodingan/ckptw");

module.exports = {
    name: "kerangajaib",
    category: "fun",
    handler: {
     coin: 10,
    },

    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "john doe"))
        );
        
        const answers = [
            "Kurasa tidak",
            "Tidak",
            "Tidak juga",
            "Bisa jadi",
            "Mungkin",
            "Iya",
            "Sudah pasti",
            "Sudah tentu"
        ];

        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        await ctx.reply(quote(`Pertanyaan: ${input}\nKerang Ajaib: *${randomAnswer}*\n` + config.msg.footer ));
    }
};
