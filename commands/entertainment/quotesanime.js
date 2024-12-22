const { quote } = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "quotesanime",
    category: "entertainment",
    handler: {
        coin: 10
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const apiUrl = tools.api.createUrl("itzpire", `/random/quotes-anime`);

        try {
            const { data } = await axios.get(apiUrl);

            const quoteData = data.data[0];
            const {karakter, anime, episode, quotes} = quoteData;

            return await ctx.reply(
                `✨ *Quotes Anime* ✨\n\n` +
                `*_${quotes}_*\n` +
                   quote( `${karakter}, ${anime} ${episode}`)
            );
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};
