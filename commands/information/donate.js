const { quote } = require("@mengkodingan/ckptw");

module.exports = {
  name: "donate",
  aliases: ["donasi"],
  category: "information",
  handler: {},
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    return await ctx.reply(
      `${quote("085733326427 (DANA)")}\n` +
        `${quote("───────────────")}\n` +
        `${quote("https://saweria.co/hikamramadhan (Saweria)")}\n` +
        `${quote("https://trakteer.id/aqlizahikam (Trakteer)")}\n` +
        "\n" +
        config.msg.footer
    ); // Dapat diubah sesuai keinginan Anda
  },
};
