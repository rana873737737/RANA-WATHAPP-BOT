/**
 * Antilink Command - Toggle antilink protection with delete/kick options
 */

const database = require('../../database');

module.exports = {
  name: 'antilink',
  aliases: [],
  category: 'admin',
  description: 'Configure antilink protection (delete/kick)',
  usage: '.antilink <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {

      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '𝐎𝐍' : '𝐎𝐅𝐅';
        const action = (settings.antilinkAction || 'delete').toUpperCase();

        return extra.reply(`
⎯͢✧🛠️ 𝐀ɴᴛɪʟɪɴᴋ 𝐒ᴇᴛᴜᴘ 🐱

▢ 𝐒ᴛᴀᴛᴜs : ${status}
▢ 𝐀ᴄᴛɪᴏɴ : ${action}

📌 𝐔sᴀɢᴇ

▢ .antilink on
▢ .antilink off
▢ .antilink set delete
▢ .antilink set kick
▢ .antilink get
`);
      }

      const opt = args[0].toLowerCase();

      if (opt === 'on') {

        if (database.getGroupSettings(extra.from).antilink) {
          return extra.reply(
`⎯͢✧⚠️ 𝐀ɴᴛɪʟɪɴᴋ 𝐀ʟʀᴇᴀᴅʏ 𝐎ɴ 🐱`
          );
        }

        database.updateGroupSettings(extra.from, {
          antilink: true
        });

        return extra.reply(
`*𝐀ɴᴛɪʟɪɴᴋ 𝐎ɴ- করা হয়েছে... বোকাচোদারা এখন তদের মায়ের ভোদায় লিংক দে..!!☺️🫰🐸☠️*`
);
      }

      if (opt === 'off') {

        database.updateGroupSettings(extra.from, {
          antilink: false
        });

        return extra.reply(
`⎯͢✧❎ 𝐀ɴᴛɪʟɪɴᴋ 𝐓ᴜʀɴᴇᴅ 𝐎ғғ 🐱`
        );
      }

      if (opt === 'set') {

        if (args.length < 2) {
          return extra.reply(`
⎯͢✧⚙️ 𝐔sᴀɢᴇ

▢ .antilink set delete
▢ .antilink set kick
`);
        }

        const setAction = args[1].toLowerCase();

        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply(`
⎯͢✧❌ 𝐈ɴᴠᴀʟɪᴅ 𝐀ᴄᴛɪᴏɴ 🐱

▢ 𝐔sᴇ : DELETE | KICK
`);
        }

        database.updateGroupSettings(extra.from, {
          antilinkAction: setAction,
          antilink: true
        });

        return extra.reply(
`*𝐀ɴᴛɪʟɪɴᴋ 𝐀𝐜𝐭𝐢𝐨𝐧 ${setAction.toUpperCase()}- করা হয়েছে... এখন কেউ গ্রুপে লিংক চুদালে সাথে সাথে লাথি মেরে গ্রুপ থেকে বের করে দেওয়া হবে..! ☺️🫰🐸☠️*`
);
      }

      if (opt === 'get') {

        const settings = database.getGroupSettings(extra.from);
        const status = settings.antilink ? '𝐎𝐍' : '𝐎𝐅𝐅';
        const action = (settings.antilinkAction || 'delete').toUpperCase();

        return extra.reply(`
⎯͢✧📊 𝐀ɴᴛɪʟɪɴᴋ 𝐂ᴏɴғɪɢ 🐱

▢ 𝐒ᴛᴀᴛᴜs : ${status}
▢ 𝐀ᴄᴛɪᴏɴ : ${action}
`);
      }

      return extra.reply(
`⎯͢✧ℹ️ 𝐔sᴇ .antilink 🐱`
      );

    } catch (error) {
      return extra.reply(
`⎯͢✧❌ 𝐄ʀʀᴏʀ

${error.message}`
      );
    }
  }
};
