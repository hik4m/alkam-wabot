const axios = require("axios");
const mime = require("mime-types");

module.exports = {
    name: "hentaivid",
    category: "nsfw",
    handler: {
        premium: true, 
    },
    code: async (ctx) => {
        try {
  
            const apiUrl = tools.api.createUrl("agatz", `/api/hentaivid`);
            const response = await axios.get(apiUrl);

            const { data } = response.data;

            // Filter data yang memiliki video MP4
            const validVideos = data.filter((item) => item.type === "video/mp4" && item.video_1);

            if (validVideos.length === 0) {
                return await ctx.reply("⚠️ Tidak ada video MP4 yang ditemukan");
            }

            const randomVideo = validVideos[Math.floor(Math.random() * validVideos.length)];
            const { title, category, views_count, video_1 } = randomVideo;

            await ctx.reply({
                video: { url: video_1 },
                mimetype: mime.lookup("mp4"),
                caption: `🎥 *Judul:* ${title}\n📂 *Kategori:* ${category} \n👀 *Jumlah tayang:* ${views_count}\n\n` + config.msg.footer,
            });
        } catch (error) {
            console.error("Error:", error.message);
            await ctx.reply(`⚠️ Terjadi kesalahan: ${error.message}`);
        }
    },
};
