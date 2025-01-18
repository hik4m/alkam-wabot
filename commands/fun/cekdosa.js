const { quote } = require("@mengkodingan/ckptw");

module.exports = {
    name: "cekdosa",
    category: "fun",
    handler: {
      coin: 10,
}, 
    code: async (ctx) => {
        // Data JSON untuk fitur cek dosa
        const data = {
            kebiasaan: [
                "Jarang ngaji",
                "Suka ngehaluin anime hentai",
                "Suka ngejahilin temen",
                "Menghardik anak yatim/piatu",
                "Durhaka kepada orang tua",
                "Mencuri kotak amal masjid",
                "Cabul",
                "Pembunuh",
                "Memfitnah orang",
                "Ghibah",
                "Sombong",
                "Nipu orang",
                "Berzina
            ],
            tingkatDosa: [0, 100], // 0% - 100%
            penghuni: [
                "Neraka Jahannam",
                "Neraka Lazha",
                "Neraka Al-Huthamah",
                "Neraka As-Sa'ir",
                "Neraka Saqar",
                "Neraka Jahim",
                "Neraka Hawiyah"
            ]
        };

        // Ambil nama pengguna atau target mention
        const mentionedJids = ctx.msg?.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const target = mentionedJids.length > 0
            ? `@${mentionedJids[0].split("@")[0]}` // Nama dari mention
            : ctx.args.join(" ") || `@${ctx.sender.jid.split("@")[0]}`; // Nama manual atau pengguna sendiri

        // Pilih kebiasaan, tingkat dosa, dan penghuni neraka secara random
        const kebiasaan = data.kebiasaan[Math.floor(Math.random() * data.kebiasaan.length)];
        const tingkatDosa = Math.floor(Math.random() * (data.tingkatDosa[1] - data.tingkatDosa[0] + 1) + data.tingkatDosa[0]);
        const penghuni = data.penghuni[Math.floor(Math.random() * data.penghuni.length)];

        // Ayat Al-Qur'an sebagai pengingat
        const ayat = `
وَمَنْ يَّعْمَلْ سُوْۤءًا اَوْ يَظْلِمْ نَفْسَهٗ ثُمَّ يَسْتَغْفِرِ اللّٰهَ يَجِدِ اللّٰهَ غَفُوْرًا رَّحِيْمًا
_(wa may ya‘mal sū'an au yaẓlim nafsahū ṡumma yastagfirillāha yajidillāha gafūrar raḥīmā(n).)_

_Dan barangsiapa berbuat kejahatan dan menganiaya dirinya, kemudian dia memohon ampunan kepada Allah, niscaya dia akan mendapatkan Allah Maha Pengampun, Maha Penyayang._
        `;

        // Kirim hasil cek dosa
        return await ctx.reply(
            `🌟 *Cek Dosa*\n\n` +
            `👤 *Nama*: ${target}\n` +
            `📖 *Kebiasaan Buruk*: ${kebiasaan}\n` +
            `⚖️ *Tingkat Dosa*: ${tingkatDosa}% Berdosa\n` +
            `🔥 *Penghuni*: ${penghuni}\n\n` +
            `${ayat}\n\n` +
             config.msg.footer,
            mentionedJids.length > 0 ? { mentions: mentionedJids } : undefined // Mention jika ada target
        );
    }
};