const { quote } = require("@mengkodingan/ckptw");
const axios = require("axios");

module.exports = {
    name: "asupan",
    category: "random",
    handler: {
        coin: 100,
    },
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

       
        const apiUrl = tools.api.createUrl("agatz", `/api/asupan`);

        try {
            
            const { data } = await axios.get(apiUrl);

           
            if (!data || !data.data || typeof data.data !== "string") {
                return await ctx.reply(quote(`⚠️ URL video tidak ditemukan.`));
            }

            const videoUrl = data.data; 

         
            await ctx.reply({
                video: { url: videoUrl }, 
                mimetype: "video/mp4",
                caption: "Berikut adalah videonya",
            });
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);

            // Tanggapan jika terjadi kesalahan
            if (error.response && error.response.status !== 200) {
                return await ctx.reply(config.msg.notFound);
            }
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    },
};
