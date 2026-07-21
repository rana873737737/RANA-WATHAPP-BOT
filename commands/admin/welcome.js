/**
 * Welcome - Enable/disable welcome messages
 */

const db = require('../../database');

module.exports = {
  name: 'welcome',
  aliases: ['welcomeon', 'welcomeoff'],
  category: 'admin',
  desc: 'Enable/disable welcome messages',
  usage: 'welcome on/off',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  execute: async (sock, msg, args) => {
    try {
      const groupId = msg.key.remoteJid;
      const action = args[0]?.toLowerCase();
      const prefix = '.';

      if (!action || !['on', 'off'].includes(action)) {
        const groupSettings = db.getGroupSettings(groupId);
        const status = groupSettings.welcome ? '𝐎𝐍 ✅' : '𝐎𝐅𝐅 ❌';

        return await sock.sendMessage(groupId, {
          text: `
⎯͢✧👋 𝐖ᴇʟᴄᴏᴍᴇ 𝐒ᴇᴛᴜᴘ 🐱

▢ 𝐒ᴛᴀᴛᴜs : ${status}
▢ 𝐌ᴇssᴀɢᴇ :
${groupSettings.welcomeMessage}

━━━━━━━━━━━━━━━
▢ ${prefix}welcome 𝐎ɴ
▢ ${prefix}welcome 𝐎ғғ
▢ ${prefix}setwelcome <𝐌ᴇssᴀɢᴇ>
`
        }, { quoted: msg });
      }

      const enable = action === 'on';

      db.updateGroupSettings(groupId, {
        welcome: enable
      });

      await sock.sendMessage(groupId, {
  text: enable
    ? `*⎯͢✧✅ওয়েলকাম মেসেজ 𝐎𝐍_করা হয়েছে.. এখন থেকে নতুন মেম্বার যোগ দিলে ওয়েলকাম জানাবে..!!🎀🌷🩷*`
    : `*⎯͢✧❎ওয়েলকাম মেসেজ 𝐎𝐅𝐅_করা হয়েছে.. এখন থেকে নতুন মেম্বার যোগ দিলে ওয়েলকাম জানাবে না..!!🥀💔*`
}, { quoted: msg });
          ? `⎯͢

    } catch (error) {
      console.error('Welcome Error:', error);

      await sock.sendMessage(msg.key.remoteJid, {
        text: '⎯͢✧❌ 𝐄ʀʀᴏʀ 🐱'
      }, { quoted: msg });
    }
  }
};
