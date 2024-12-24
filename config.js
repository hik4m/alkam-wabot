// Modul dan dependensi yang diperlukan
const pkg = require("./package.json");
const { monospace, italic, quote } = require("@mengkodingan/ckptw");

// Konfigurasi
global.config = {
  // Informasi bot dasar
  bot: {
    name: "Alkam - Bot", // Nama bot
    prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i, // Karakter awalan perintah yang diizinkan
    phoneNumber: "6285784706902", // Nomor telepon bot (opsional jika menggunakan QR code)
    thumbnail:
      "https://i.pinimg.com/736x/cb/44/24/cb4424110d1f61c226bf8600011f048c.jpg", // Gambar thumbnail bot
    website: "https://chat.whatsapp.com/IOI99Tx6ZN4JlQhNXMD379", // Website untuk WhatsApp bot
    groupJid: "IOI99Tx6ZN4JlQhNXMD379", // JID untuk group bot (opsional jika tidak menggunakan requireBotGroupMembership)
  },

  // Pesan bot yang disesuaikan untuk situasi tertentu
  msg: {
    admin: quote("⛔ Perintah hanya dapat diakses oleh admin grup!"), // Pesan ketika perintah hanya untuk admin
    banned: quote(
      "⛔ Tidak dapat memproses karena Anda telah dibanned oleh Owner!"
    ), // Pesan untuk pengguna yang dibanned
    botAdmin: quote(
      "⛔ Tidak dapat memproses karena bot bukan admin grup ini!"
    ), // Pesan jika bot bukan admin di grup
    botGroupMembership: quote(
      "⛔ Tidak dapat memproses karena Anda tidak bergabung dengan grup bot!"
    ), // Pesan untuk pengguna yang tidak ada dalam grup
    cooldown: quote("🔄 Perintah ini sedang dalam cooldown, tunggu..."), // Pesan saat cooldown perintah
    coin: quote("⛔ Tidak dapat memproses karena koin Anda tidak cukup!"), // Pesan ketika koin tidak cukup
    group: quote("⛔ Perintah hanya dapat diakses dalam grup!"), // Pesan untuk perintah grup
    owner: quote("⛔ Perintah hanya dapat diakses Owner!"), // Pesan untuk perintah yang hanya owner bisa akses
    premium: quote(
      "⛔ Tidak dapat memproses karena Anda bukan pengguna Premium!"
    ), // Pesan jika pengguna bukan Premium
    private: quote("⛔ Perintah hanya dapat diakses dalam obrolan pribadi!"), // Pesan untuk perintah obrolan pribadi
    restrict: quote("⛔ Perintah ini telah dibatasi karena alasan keamanan!"), // Pesan pembatasan perintah

    watermark: `@${pkg.name} / v${pkg.version}`, // Watermark nama dan versi pada bot
    footer: italic("Developed by *Hikam.*"), // Footer di pesan bot
    readmore: "\u200E".repeat(4001), // String read more

    wait: quote("🔄 Tunggu sebentar..."), // Pesan loading
    notFound: quote("❎ Tidak ada yang ditemukan! Coba lagi nanti."), // Pesan item tidak ditemukan
    urlInvalid: quote("❎ URL tidak valid!"), // Pesan jika URL tidak valid
  },

  // Informasi owner bot
  owner: {
    name: "Aqliza Hikam (Alsy)", // Nama owner bot
    number: "6285733326427", // Nomor telepon owner bot
    organization: "Hikam Company Devteam", // Nama organisasi owner bot
    co: ["6285730824102"], // Nomor co-owner bot
  },

  owner2: {
    name: "Alisya Putri",
    number: "6285730824102",
    organization: "Hikam Companion",
  },

  // Konfigurasi stiker bot
  sticker: {
    packname: "Stiker ini dibuat oleh", // Nama paket stiker
    author: "@aqlizaa", // Pembuat stiker
  },

  // Pengaturan sistem bot
  system: {
    autoRead: true, // Apakah bot otomatis membaca pesan masuk
    autoTypingOnCmd: true, // Aktifkan status mengetik ketika memproses perintah
    cooldown: 5000, // Waktu cooldown antar perintah dalam milidetik
    restrict: false, // Membatasi perintah tertentu untuk keamanan
    requireBotGroupMembership: false, // Apakah pengguna harus bergabung dengan grup bot
    port: 8080, // Port yang diinginkan (opsional jika menggunakan server)
    selfOwner: false, // Apakah bot menjadi owner
    selfReply: true, // Apakah bot merespon pesan yang dikirim bot sendiri
    timeZone: "Asia/Jakarta", // Zona waktu bot
    usePairingCode: true, // Menggunakan kode pairing untuk koneksi
    useServer: true, // Menggunakan server
  },
};
