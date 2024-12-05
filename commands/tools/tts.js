const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "tts",
    aliases: ["texttospeechgoogle", "ttsgoogle"],
    category: "tools",
    handler: {
        coin: [10, "text", 1]
    },
    code: async (ctx) => {
        const status = await handler(ctx, module.exports.handler);
        if (status) return;

        let input = ctx.quoted?.conversation || ctx.quoted?.extendedTextMessage?.text || Object.values(ctx.quoted || {}).find(msg => msg?.caption || msg?.text)?.caption || ctx.args.slice(ctx.args[0]?.length === 2 ? 1 : 0).join(" ") || null;
        let langCode = ctx.args[0]?.length === 2 ? ctx.args[0] : "id";

        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            quote(tools.msg.generateCommandExample(ctx._used.prefix + ctx._used.command, "en halo dunia!"))
        );

        try {
            const apiUrl = tools.api.createUrl("fastrestapis", "/tts/google", {
                text: input,
                target: langCode
            });
            const {
                data
            } = await axios.get(apiUrl, {
                headers: {
                    "x-api-key": api.listUrl().fastrestapis.APIKey,
                    response: "arraybuffer"
                }
            });

            return await ctx.reply({
                audio: data,
                mimetype: mime.lookup("mp3"),
                ptt: true
            });
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};