const {
    pinterest
} = require("../tools/scraper.js");
const {
    bold,
    monospace
} = require("@mengkodingan/ckptw");
const {
    proto,
    generateWAMessageFromContent
} = require("@whiskeysockets/baileys");
const mime = require("mime-types");

module.exports = {
    name: "pinterest",
    aliases: ["pin", "pint"],
    category: "internet",
    code: async (ctx) => {
        const handlerObj = await global.handler(ctx, {
            banned: true,
            coin: 3
        });

        if (handlerObj.status) return ctx.reply(handlerObj.message);

        const input = ctx._args.join(" ");

        if (!input) return ctx.reply(
            `${global.msg.argument}\n` +
            `Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} rei ayanami`)}`
        );

        try {
            const result = await pinterest(input);

            if (!result) throw new Error(global.msg.notFound);

            const response = await axios.get(result, {
                responseType: "arraybuffer"
            });
            const buffer = Buffer.from(response.data, "binary");

            return await ctx.reply({
                image: buffer,
                mimetype: mime.contentType("png"),
                caption: `❖ ${bold("Pinterest")}\n` +
                    "\n" +
                    `➲ Kueri: ${input}\n` +
                    "\n" +
                    global.msg.footer
            });
        } catch (error) {
            console.error("Error:", error);
            return ctx.reply(`${bold("[ ! ]")} Terjadi kesalahan: ${error.message}`);
        }
    }
};