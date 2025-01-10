const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "xnxxdownload",
    aliases: ["xnxxd", "xnxxdownloader", "xnxxdown"],
    category: "nsfws",
    handler: {
        coin: [100, "text", 1], 
        premium: true, 
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const url = ctx.args[0] || null;

        if (!url) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "https://example.com/"))
        );

        const isUrl = await tools.general.isUrl(url);
        if (!isUrl) return await ctx.reply(config.msg.urlInvalid);

        try {
            const apiUrl = tools.api.createUrl("agatz", "/api/d/xnxxdown", {
                url
            }, null, ["url"]);
            console.log("API URL:", apiUrl);

            const response = await axios.get(apiUrl);
            const { title, duration, files } = response.data.data;

            if (!files || !files.high) {
                return await ctx.reply(quote("⚠️ File video tidak ditemukan atau tidak tersedia."));
            }

            const message = 
                `${quote(`🎬 Judul: ${title}`)}\n` +
                `${quote(`⏱️ Durasi: ${duration} detik`)}\n` +
                `${quote(`📂 Format: mp4`)}`;

            await ctx.reply(message); 
            return await ctx.reply({
                video: {
                    url: files.high
                },
                mimetype: mime.lookup("mp4")
            });
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.response && error.response.status === 404) {
                return await ctx.reply(config.msg.notFound);
            }
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};
