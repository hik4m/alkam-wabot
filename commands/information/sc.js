const {
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "sc",
    premium: true, 
    aliases: ["script", "source", "sourcecode"],
    category: "information",
    handler: {
     premium: true, 
     owner: true, 
},
    code: async (ctx) => {
        if (await handler(ctx, module.exports.handler)) return;

        return await ctx.reply(
            `${quote("https://github.com/hik4m/alkam-wabot.git")}\n` +
            "\n" +
            config.msg.footer
        ); // Jika Anda tidak menghapus ini, terima kasih!
    }
};
