/**
 * Mode Command
 * Toggle bot between private and public mode
 */

const config = require('../../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'mode',
  aliases: ['botmode', 'privatemode', 'publicmode'],
  description: 'Toggle bot between private and public mode',
  usage: '.mode <private/public>',
  category: 'owner',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    try {

      if (!args[0]) {
        const currentMode = config.selfMode ? '𝐏𝐑𝐈𝐕𝐀𝐓𝐄' : '𝐏𝐔𝐁𝐋𝐈𝐂';
        const status = config.selfMode
          ? '𝐎ɴʟʏ 𝐎ᴡɴᴇʀ 𝐂ꫝɴ 𝐔sᴇ 𝐂ᴏᴍᴍꫝɴᴅs'
          : '𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ꫝɴ 𝐔sᴇ 𝐂ᴏᴍᴍꫝɴᴅs';

        return extra.reply(`
⎯͢✧🤖 𝐁ᴏᴛ 𝐌ᴏᴅᴇ 🐱

▢ 𝐂ᴜʀʀᴇɴᴛ : ${currentMode}
▢ 𝐒ᴛꫝᴛᴜs : ${status}

⎯͢✧⚙️ 𝐔sꫝɢᴇ

▢ .mode 𝐩ʀɪᴠꫝᴛᴇ
▢ .mode 𝐩ᴜʙʟɪᴄ
`);
      }

      const mode = args[0].toLowerCase();

      if (mode === 'private' || mode === 'priv') {

        if (config.selfMode) {
          return extra.reply(
            '⎯͢✧🔒 𝐁ᴏᴛ 𝐀ʟʀᴇꫝᴅʏ 𝐈ɴ 𝐏ʀɪᴠꫝᴛᴇ 𝐌ᴏᴅᴇ 🐱'
          );
        }

        updateConfig('selfMode', true);
        config.selfMode = true;

        return extra.reply(`
⎯͢✧🔒 𝐁ᴏᴛ 𝐌ᴏᴅᴇ 𝐂ʜꫝɴɢᴇᴅ 🐱

▢ 𝐌ᴏᴅᴇ : 𝐏𝐑𝐈𝐕𝐀𝐓𝐄
▢ 𝐎ɴʟʏ 𝐎ᴡɴᴇʀ 𝐂ꫝɴ 𝐔sᴇ 𝐓ʜᴇ 𝐁ᴏᴛ
`);
      }

      if (mode === 'public' || mode === 'pub') {

        if (!config.selfMode) {
          return extra.reply(
            '⎯͢✧🌐 𝐁ᴏᴛ 𝐀ʟʀᴇꫝᴅʏ 𝐈ɴ 𝐏ᴜʙʟɪᴄ 𝐌ᴏᴅᴇ 🐱'
          );
        }

        updateConfig('selfMode', false);
        config.selfMode = false;

        return extra.reply(`
⎯͢✧🌐 𝐁ᴏᴛ 𝐌ᴏᴅᴇ 𝐂ʜꫝɴɢᴇᴅ 🐱

▢ 𝐌ᴏᴅᴇ : 𝐏𝐔𝐁𝐋𝐈𝐂
▢ 𝐄ᴠᴇʀʏᴏɴᴇ 𝐂ꫝɴ 𝐔sᴇ 𝐓ʜᴇ 𝐁ᴏᴛ
`);
      }

      return extra.reply(`
⎯͢✧❌ 𝐈ɴᴠꫝʟɪᴅ 𝐌ᴏᴅᴇ 🐱

▢ .mode 𝐩ʀɪᴠꫝᴛᴇ
▢ .mode 𝐩ᴜʙʟɪᴄ
`);

    } catch (error) {
      console.error('Mode command error:', error);

      await extra.reply(
        '⎯͢✧❌ 𝐄ʀʀᴏʀ 🐱'
      );
    }
  }
};

function updateConfig(key, value) {
  try {
    const configPath = path.join(__dirname, '..', '..', 'config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');

    const regex = new RegExp(`(${key}:\\s*)(true|false)`, 'g');
    configContent = configContent.replace(regex, `$1${value}`);

    fs.writeFileSync(configPath, configContent, 'utf8');

    delete require.cache[require.resolve('../../config')];
  } catch (error) {
    console.error('Error saving config:', error);
  }
          }

