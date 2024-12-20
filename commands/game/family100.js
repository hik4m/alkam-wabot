const { monospace, quote } = require("@mengkodingan/ckptw");
const axios = require("axios");
const levenshtein = require("fast-levenshtein");

const session = new Map();

module.exports = {
  name: "family100",
  category: "game",
  handler: {
    group: true,
  },
  code: async (ctx) => {
    if (await handler(ctx, module.exports.handler)) return;

    if (session.has(ctx.id))
      return await ctx.reply(quote(`🎮 Sesi permainan sedang berjalan!`));

    try {
      const apiUrl = tools.api.createUrl("siputzx", "/api/games/family100");
      const { data } = (await axios.get(apiUrl)).data;

      const answersMap = data.jawaban.reduce((acc, answer, index) => {
        acc.set(index + 1, { answer: answer.toUpperCase(), found: false });
        return acc;
      }, new Map());

      const game = {
        coin: {
          answered: 5,
          allAnswered: 50,
        },
        timeout: 90000,
        senderId: ctx.sender.jid.split(/[:@]/)[0],
        answersMap,
        participants: new Set(),
      };

      session.set(ctx.id, true);

      const formatAnswers = () =>
        [...game.answersMap.keys()]
          .map(
            (k) =>
              `${k}. [${
                game.answersMap.get(k).found
                  ? game.answersMap.get(k).answer
                  : "????"
              }]`
          )
          .join("\n");

      await ctx.reply(
        `${quote(`Soal: ${data.soal}`)}\n` +
          `${quote(`Jumlah jawaban: ${answersMap.size}`)}\n` +
          `${quote(`Batas waktu ${game.timeout / 1000} detik`)}\n` +
          `${quote(
            "Ketik 'surrender' untuk menyerah atau 'hint' untuk mendapatkan petunjuk."
          )}\n` +
          "\n" +
          formatAnswers() +
          "\n" +
          config.msg.footer
      );

      const collector = ctx.MessageCollector({
        time: game.timeout,
      });

      collector.on("collect", async (m) => {
        const userAnswer = m.content.toUpperCase();
        const participantJid = m.jid;
        const participantId = participantJid.split("@")[0];

        if (userAnswer === "HINT") {
          const hints = [...game.answersMap.keys()]
            .map((k) => {
              const value = game.answersMap.get(k);
              if (value.found) return `${k}. [${value.answer}]`;

              const hintWords = value.answer
                .split(" ")
                .map((word) => word[0] + ".".repeat(word.length - 1));
              return `${k}. [${hintWords.join(" ")}]`;
            })
            .join("\n");

          return await ctx.reply(`${quote("💡 Petunjuk:")}\n` + hints);
        }

        for (const [key, value] of game.answersMap) {
          const distance = levenshtein.get(userAnswer, value.answer); // Hitung jarak Levenshtein
          const isSimilarLength =
            Math.abs(userAnswer.length - value.answer.length) <= 2; // Validasi panjang kata

          if (value.answer === userAnswer && !value.found) {
            value.found = true;
            game.participants.add(participantId);

            await db.add(`user.${participantId}.game.coin`, game.coin.answered);
            await ctx.sendMessage(
              ctx.id,
              {
                text:
                  quote(
                    `✅ ${tools.general.ucword(
                      userAnswer
                    )} benar! Jawaban tersisa: ${
                      [...game.answersMap.values()].filter((v) => !v.found)
                        .length
                    }`
                  ) + `\n\n${formatAnswers()}`,
              },
              { quoted: m }
            );

            if ([...game.answersMap.values()].every((v) => v.found)) {
              session.delete(ctx.id);
              for (const participant of game.participants) {
                await db.add(
                  `user.${participant}.game.coin`,
                  game.coin.allAnswered
                );
                await db.add(`user.${participant}.winGame`, 1);
              }
              return await ctx.reply(
                quote(
                  `🎉 Selamat! Semua jawaban telah terjawab! Setiap anggota yang menjawab mendapat ${game.coin.allAnswered} koin.`
                )
              );
            }
            return;
          } else if (distance <= 2 && isSimilarLength && !value.found) {
            return await ctx.reply(quote(`🤏 Hampir benar! Coba lagi.`), {
              quoted: m,
            });
          }
        }

        if (userAnswer === "SURRENDER") {
          session.delete(ctx.id);
          const remainingAnswers = [...game.answersMap.values()]
            .filter((v) => !v.found)
            .map((v) => v.answer)
            .join(", ");

          await ctx.reply(
            `${quote("🏳️ Anda menyerah!")}\n` +
              `${quote(`Jawabannya adalah: ${remainingAnswers}`)}`
          );
          return collector.stop();
        }
      });

      collector.on("end", async () => {
        const remaining = [...game.answersMap.values()]
          .filter((v) => !v.found)
          .map((v) => v.answer)
          .join(", ");

        if (session.has(ctx.id)) {
          session.delete(ctx.id);
          return await ctx.reply(
            `${quote("⏱ Waktu habis!")}\n` +
              `${quote(`Jawaban yang belum terjawab adalah: ${remaining}`)}`
          );
        }
      });
    } catch (error) {
      console.error(`[${config.pkg.name}] Error:`, error);
      return await ctx.reply(quote(`⚠️ Terjadi kesalahan: ${error.message}`));
    }
  },
};
