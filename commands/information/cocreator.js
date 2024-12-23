const { VCardBuilder } = require("@mengkodingan/ckptw");

module.exports = {
  name: "coowner",
  aliases: ["cocreator", "codeveloper"],
  category: "information",
  handler: {},
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    const vcard = new VCardBuilder()
      .setFullName(config.owner2.name)
      .setOrg(config.owner2.organization)
      .setNumber(config.owner2.number)
      .build();

    return await ctx.reply({
      contacts: {
        displayName: config.owner2.name,
        contacts: [
          {
            vcard,
          },
        ],
      },
    });
  },
};
