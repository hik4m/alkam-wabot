const { quote } = require("@mengkodingan/ckptw");
const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "cevietnam",
    category: "random",
    handler: {
        coin: 10,
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        // URL API
        const apiUrl = tools.api.createUrl("btch", `/vietnam`);

        try {
            // Fetch data gambar dari API
            const response = await axios.get(apiUrl, {
                responseType: "arraybuffer",
            });

            const buffer = Buffer.from(response.data); 
         
            if (!buffer || buffer.length === 0) {
                return await ctx.reply(quote(`⚠️ Gambar tidak ditemukan.`));
            }


            await ctx.reply({
                image: buffer, 
                mimetype: mime.lookup("png"), 
                caption: "Ini hasil gambarnya !", 
            });
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);

            
            if (error.response && error.response.status !== 200) {
                return await ctx.reply(config.msg.notFound);
            }
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    },
};
