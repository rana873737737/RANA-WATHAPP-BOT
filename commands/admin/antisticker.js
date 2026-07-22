      /**
 * Antisticker Command - Toggle antisticker protection with delete/kick options
 */

const database = require('../../database');

module.exports = {
  name: 'antisticker',
  aliases: ['nosticker'],
  category: 'admin',
  description: 'Configure antisticker protection (stickers not allowed)',
  usage: '.antisticker <on/off/set/get>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {

      if (!args[0]) {
        const settings = database.getGroupSettings(extra.from);
        const status = settings.antisticker ? '𝐎𝐍' : '𝐎𝐅𝐅';
        const action = (settings.antistickerAction || 'delete').toUpperCase();

        return extra.reply(`
⎯͢✧🖼️ 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐒ᴇᴛᴜᴘ 🐱

▢ 𝐒ᴛᴀᴛᴜs : ${status}
▢ 𝐀ᴄᴛɪᴏɴ : ${action}

📌 𝐔𝐒𝐀𝐆𝐄

▢ .antisticker on
▢ .antisticker off
▢ .antisticker set delete
▢ .antisticker set kick
▢ .antisticker get
`);
      }

      const opt = args[0].toLowerCase();

      if (opt === 'on') {

        if (database.getGroupSettings(extra.from).antisticker) {
          return extra.reply(
`⎯͢✧⚠️ 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐀ʟʀᴇᴀᴅʏ 𝐎ɴ 🐱`
          );
        }

        database.updateGroupSettings(extra.from, {
          antisticker: true
        });

        return extra.reply(
`⎯͢✧✅ 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐓ᴜʀɴᴇᴅ 𝐎ɴ 🐱`
        );
      }

      if (opt === 'off') {

        database.updateGroupSettings(extra.from, {
          antisticker: false
        });

        return extra.reply(
`⎯͢✧❎ 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐓ᴜʀɴᴇᴅ 𝐎ғғ 🐱`
        );
      }

      if (opt === 'set') {

        if (args.length < 2) {
          return extra.reply(`
⎯͢✧⚙️ 𝐔𝐒𝐀𝐆𝐄

▢ .antisticker set delete
▢ .antisticker set kick
`);
        }

        const setAction = args[1].toLowerCase();

        if (!['delete', 'kick'].includes(setAction)) {
          return extra.reply(`
⎯͢✧❌ 𝐈ɴᴠᴀʟɪᴅ 𝐀ᴄᴛɪᴏɴ 🐱

▢ 𝐔𝐒𝐄 : DELETE | KICK
`);
        }

        database.updateGroupSettings(extra.from, {
          antistickerAction: setAction,
          antisticker: true
        });

        return extra.reply(
`⎯͢✧✅ 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐀ᴄᴛɪᴏɴ 𝐒ᴇᴛ 𝐓ᴏ ${setAction.toUpperCase()} 🐱`
        );
      }

      if (opt === 'get') {

        const settings = database.getGroupSettings(extra.from);
        const status = settings.antisticker ? '𝐎𝐍' : '𝐎𝐅𝐅';
        const action = (settings.antistickerAction || 'delete').toUpperCase();

        return extra.reply(`
⎯͢✧📊 𝐀ɴᴛɪ𝐒ᴛɪᴄᴋᴇʀ 𝐂ᴏɴғɪɢ 🐱

▢ 𝐒ᴛᴀᴛᴜs : ${status}
▢ 𝐀ᴄᴛɪᴏɴ : ${action}
`);
      }

      return extra.reply(
`⎯͢✧ℹ️ 𝐔𝐒𝐄 .antisticker 🐱`
      );

    } catch (error) {
      return extra.reply(
`⎯͢✧❌ 𝐄ʀʀᴏʀ

${error.message}`
      );
    }
  }
};
