const {
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "tiktokdl",
    aliases: ["tiktok", "tiktoknowm", "tt", "ttdl", "vt", "vtdl", "vtdltiktok", "vtnowm"],
    category: "downloader",
    handler: {
        coin: 10
    },
    code: async (ctx) => {
        // Mengecek apakah pengguna memiliki cukup "coin"
        if (await handler(ctx, module.exports.handler)) return;

        // Mengambil input dari pengguna
        const input = ctx.args.join(" ") || null;

        // Jika tidak ada input, kirimkan panduan ke pengguna
        if (!input) return await ctx.reply(
            `${quote(tools.msg.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(tools.msg.generateCommandExample(ctx._used, "https://example.com/ -a"))}\n` +
            quote(tools.msg.generatesFlagInformation({
                "-a": "Otomatis kirim audio."
            }))
        );

        // Parsing flag dan URL dari input
        const flag = tools.general.parseFlag(input, {
            "-a": {
                type: "boolean",
                key: "audio"
            }
        });
        const url = flag.input || null;

        // Mengecek apakah URL valid
        const isUrl = await tools.general.isUrl(url);
        if (!isUrl) return await ctx.reply(config.msg.urlInvalid);

        try {
            // Menentukan jenis media yang diminta (audio atau video)
            const mediaType = flag.audio ? "audio" : "video_image";

            // Membuat URL API untuk memproses permintaan
            const apiUrl = tools.api.createUrl("https://api.tiklydown.eu.org", "/api/download", {
                url
            });
            const {
                data
            } = await axios.get(apiUrl);

            // Jika pengguna meminta audio
            if (mediaType === "audio") {
                return await ctx.reply({
                    audio: {
                        url: data.music.play_url
                    },
                    mimetype: mime.lookup("mp3")
                });
            }

            // Jika pengguna meminta video tanpa watermark
            if (mediaType === "video_image") {
                if (data.video?.noWatermark) {
                    return await ctx.reply({
                        video: {
                            url: data.video.noWatermark
                        },
                        mimetype: mime.lookup("mp4"),
                        caption: `${quote(`[Video noWatermark]\n` +
                            `Author: ${data.author?.name || "Unknown"}\n` +
                            `Caption: ${data.title || "No title"}\n` +
                            `Url: ${url}`)}\n\n${config.msg.footer}`
                    });
                }

                // Jika ada gambar yang tersedia dalam data
                if (data.images && data.images.length > 0) {
                    for (const image of data.images) {
                        await ctx.reply({
                            image: {
                                url: image.url
                            },
                            mimetype: mime.lookup("png")
                        });
                    }
                }
            }
        } catch (error) {
            // Menangani kesalahan saat mengakses API
            console.error(`[${config.pkg.name}] Error:`, error);
            if (error.status !== 200) return await ctx.reply(config.msg.notFound);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    }
};