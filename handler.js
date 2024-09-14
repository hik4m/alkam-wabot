const {
    Cooldown
} = require("@mengkodingan/ckptw");

async function handler(ctx, options) {
    const senderJid = ctx.sender.jid;
    const senderNumber = senderJid.replace(/@.*|:.*/g, "");

    const isOwner = await global.tools.general.isOwner(ctx, senderNumber, true);
    const isPremium = await global.db.get(`user.${senderNumber}.isPremium`);

    const checkOptions = {
        admin: {
            function: async () => ctx.isGroup() && !await global.tools.general.isAdmin(ctx, senderJid),
            msg: global.msg.admin
        },
        banned: {
            function: async () => await global.db.get(`user.${senderNumber}.isBanned`),
            msg: global.msg.banned
        },
        botAdmin: {
            function: async () => ctx.isGroup() && !await global.tools.general.isBotAdmin(ctx),
            msg: global.msg.botAdmin
        },
        energy: {
            function: async () => {
                if (isOwner || isPremium) {
                    return false;
                }

                const userEnergy = await global.db.get(`user.${senderNumber}.energy`);
                const requiredEnergy = options.energy || 0;

                const isOnCharger = await global.db.get(`user.${senderNumber}.onCharger`);
                if (isOnCharger) {
                    return true;
                }

                if (userEnergy < requiredEnergy) {
                    return true;
                }

                await global.db.subtract(`user.${senderNumber}.energy`, requiredEnergy);
                return false;
            },
            msg: global.msg.energy
        },
        cooldown: {
            function: async () => new Cooldown(ctx, global.system.cooldown).onCooldown,
            msg: global.msg.cooldown
        },
        group: {
            function: async () => !await ctx.isGroup(),
            msg: global.msg.group
        },
        owner: {
            function: async () => !isOwner,
            msg: global.msg.owner
        },
        premium: {
            function: async () => !isOwner && !isPremium,
            msg: global.msg.premium
        },
        private: {
            function: async () => await ctx.isGroup(),
            msg: global.msg.private
        }
    };

    for (const [option, checkOption] of Object.entries(options)) {
        const {
            function: checkFunction,
            msg
        } = checkOptions[option] || {};
        if (checkFunction && await checkFunction()) {
            if (option === "energy" && await global.db.get(`user.${senderNumber}.onCharger`)) {
                return {
                    status: true,
                    message: global.msg.onCharger
                };
            }
            return {
                status: true,
                message: msg
            };
        }
    }

    return {
        status: false,
        message: null
    };
}

module.exports = handler;