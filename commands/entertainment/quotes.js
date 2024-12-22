const { quote } = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "quotes",
    category: "entertainment",
    handler: {
        coin: 10
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const apiUrl = tools.api.createUrl("itzpire", `/random/quotes`);

        try {
            const { data } = await axios.get(apiUrl);

            const {character, content, status, timeDate} = data.result;

            return await ctx.reply(
                `✨ *Quotes* ✨\n\n` +
                `*_${content}_*\n` +
                   quote( `${character}, ${status}, ${timeDate}`)
            );
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};
