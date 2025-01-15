const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "afk",
    category: "profile",
    handler: {},
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        const input = ctx.args.join(" ") || null;

        try {
            // Simpan status AFK di database
            db.set(`user.${ctx.sender.jid.split(/[:@]/)[0]}.afk`, {
                reason: input,
                timeStamp: Date.now()
            });

            return await ctx.reply(quote(`📴 Anda akan AFK, ${input ? `dengan alasan ${input}` : "tanpa alasan apapun"}.`));
        } catch (error) {
            console.error(`[${config.pkg.name}] Error:`, error);
            return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
        }
    },

    // Tambahkan event listener untuk mendeteksi mention/tag
    onMessage: async (ctx) => {
        try {
            // Dapatkan daftar mention dari pesan
            const mentions = ctx.message.mentionedJid || [];
            
            for (const mention of mentions) {
                const userId = mention.split(/[:@]/)[0];

                // Periksa apakah user sedang AFK
                const afkData = db.get(`user.${userId}.afk`);
                if (afkData) {
                    // Hitung durasi AFK
                    const duration = Math.floor((Date.now() - afkData.timeStamp) / 1000); // Dalam detik
                    const reason = afkData.reason || "tanpa alasan apapun";

                    // Kirim pesan bahwa user sedang AFK
                    await ctx.reply(
                       quote(`🤫 Ssst, jangan ganggu dia. User ini sedang AFK dengan alasan: ${reason}. Sudah AFK selama ${duration} detik.`)
                    );
                }
            }
        } catch (error) {
            console.error("Error saat memproses mention:", error);
        }
    }
};