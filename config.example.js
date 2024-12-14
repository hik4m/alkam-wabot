// Modul dan dependensi yang diperlukan
const pkg = require("./package.json");
const {
    monospace,
    italic,
    quote
} = require("@mengkodingan/ckptw");

// Konfigurasi
global.config = {
    // Informasi bot dasar
    bot: {
        name: "CKPTW", // Nama bot
        prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i, // Karakter awalan perintah yang diizinkan
        phoneNumber: "", // Nomor telepon bot (opsional jika menggunakan QR code)
        thumbnail: "https://e1.pxfuel.com/desktop-wallpaper/943/672/desktop-wallpaper-whatsapp-bot-what-is-it-and-how-to-use-messenger-chatbots-chatbot.png", // Gambar thumbnail bot
        website: "https://chat.whatsapp.com/FxEYZl2UyzAEI2yhaH34Ye", // Website untuk WhatsApp bot
        groupJid: "" // JID untuk group bot (opsional jika tidak menggunakan requireBotGroupMembership)
    },

    // Pesan bot yang disesuaikan untuk situasi tertentu
    msg: {
        admin: quote("⛔ Maaf, perintah ini hanya dapat diakses oleh admin grup."), // Pesan ketika perintah hanya untuk admin
        banned: quote("⛔ Maaf, Anda telah diblokir sehingga tidak dapat menggunakan perintah ini."), // Pesan untuk pengguna yang dibanned
        botAdmin: quote("⛔ Maaf, bot perlu menjadi admin untuk memproses perintah ini."), // Pesan jika bot bukan admin di grup
        botGroupMembership: quote("⛔ Maaf, Anda tidak tergabung dalam grup bot sehingga tidak dapat menggunakan perintah ini."), // Pesan untuk pengguna yang tidak ada dalam grup
        cooldown: quote("🔄 Perintah ini sedang dalam masa tunggu. Mohon bersabar..."), // Pesan saat cooldown perintah
        coin: quote("⛔ Maaf, koin Anda tidak mencukupi untuk memproses perintah ini."), // Pesan ketika koin tidak cukup
        group: quote("⛔ Maaf, perintah ini hanya dapat diakses dalam grup."), // Pesan untuk perintah grup
        owner: quote("⛔ Maaf, perintah ini hanya dapat diakses oleh pemilik bot."), // Pesan untuk perintah yang hanya owner bisa akses
        premium: quote("⛔ Maaf, fitur ini hanya tersedia untuk pengguna premium."), // Pesan jika pengguna bukan Premium
        private: quote("⛔ Maaf, perintah ini hanya dapat diakses dalam obrolan pribadi."), // Pesan untuk perintah obrolan pribadi
        restrict: quote("⛔ Maaf, perintah ini telah dibatasi karena alasan keamanan."), // Pesan pembatasan perintah

        watermark: `@${pkg.name} / v${pkg.version}`, // Watermark nama dan versi pada bot
        footer: italic("Developed by ItsReimau"), // Footer di pesan bot
        readmore: "\u200E".repeat(4001), // String read more

        wait: quote("🔄 Mohon tunggu sebentar..."), // Pesan loading
        notFound: quote("❎ Maaf, tidak ada hasil yang ditemukan. Silakan coba lagi nanti."), // Pesan item tidak ditemukan
        urlInvalid: quote("❎ Maaf, URL yang Anda masukkan tidak valid.") // Pesan jika URL tidak valid
    },

    // Informasi owner bot
    owner: {
        name: "", // Nama owner bot
        number: "", // Nomor telepon owner bot
        organization: "", // Nama organisasi owner bot
        co: [""] // Nomor co-owner bot
    },

    // Konfigurasi stiker bot
    sticker: {
        packname: "Stiker ini dibuat oleh", // Nama paket stiker
        author: "@ckptw-wabot" // Pembuat stiker
    },

    // Pengaturan sistem bot
    system: {
        autoRead: true, // Apakah bot otomatis membaca pesan masuk
        autoTypingOnCmd: true, // Aktifkan status mengetik ketika memproses perintah
        cooldown: 5000, // Waktu cooldown antar perintah dalam milidetik
        restrict: false, // Membatasi perintah tertentu untuk keamanan
        requireBotGroupMembership: false, // Apakah pengguna harus bergabung dengan grup bot
        port: 8080, // Port yang diinginkan (opsional jika menggunakan server)
        selfOwner: true, // Apakah bot menjadi owner
        selfReply: true, // Apakah bot merespon pesan yang dikirim bot sendiri
        timeZone: "Asia/Jakarta", // Zona waktu bot
        usePairingCode: false, // Menggunakan kode pairing untuk koneksi
        useServer: false // Menggunakan server
    }
};