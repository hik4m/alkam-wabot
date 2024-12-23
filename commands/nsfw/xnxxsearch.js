const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "xnxxsearch",
    aliases: ["xnxx", "xnxxsearch", "xnxxs"],
    category: "nsfw",
    handler: {
        coin: [100, "text", 1]
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "moon"))
        );

        try {
            const apiUrl = tools.api.createUrl("agatz", "/api/xnxx", {
                message: input
            });
            const response = await axios.get(apiUrl);

            // Ambil data yang benar dari respons API
            const { result } = response.data.data;

            // Batasi hanya 5 hasil pertama
            const limitedResults = result.slice(0, 5);

            // Buat teks hasil pencarian
            const resultText = limitedResults.map((d) =>
                `${quote(`Judul: ${d.title}`)}\n` +
                `${quote(`Info: ${d.info}`)}\n` +
                `${quote(`URL: ${d.link}`)}`
            ).join(
                "\n" +
                `${quote("─────")}\n`
            );

            // Kirim hasil ke pengguna
            return await ctx.reply(
                `${resultText}\n` +
                "\n" +
                config.msg.footer
            );
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.response && error.response.status !== 200) {
                return await ctx.reply(config.msg.notFound);
            }
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};
