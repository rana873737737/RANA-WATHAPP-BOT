/**
 * Demote Command - Remove admin privileges
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'demote',
  aliases: ['removeadmin'],
  category: 'admin',
  description: 'Remove admin privileges from member',
  usage: '.demote @user',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      let target;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;
      const mentioned = ctx?.mentionedJid || [];

      if (mentioned.length > 0) {
        target = mentioned[0];
      } else if (ctx?.participant && ctx.stanzaId && ctx.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply(
          '❌ Please mention or reply to the user to demote!\n\nExample: .demote @user'
        );
      }

      // Fetch fresh group metadata
      const freshMetadata = await sock.groupMetadata(extra.from);

      // Find participant (LID-aware)
      const foundParticipant = findParticipant(
        freshMetadata.participants,
        target
      );

      if (!foundParticipant) {
        return extra.reply('❌ User not found in group!');
      }

      // Check if target is admin
      if (
        foundParticipant.admin !== 'admin' &&
        foundParticipant.admin !== 'superadmin'
      ) {
        return extra.reply('❌ This user is not an admin!');
      }

      // Demote user
      await sock.groupParticipantsUpdate(extra.from, [target], 'demote');

      const promoter =
        msg.key.participant || extra.sender || msg.key.remoteJid;

      const user = target.split('@')[0];
      const by = promoter.split('@')[0];

      await sock.sendMessage(
        extra.from,
        {
          text: `🥀 ⎯͢✧𝐃ᴇᴍᴏᴛᴇ𝐃 ✧⎯͢

🥹 ⎯͢✧দুঃখিত......!!
🌷 ⎯͢✧ @${user}

❌ ⎯͢✧আজ থেকে তুমি আর এই গুরুপের এডমিন নও...!! 🥺🎀

👑 ⎯͢✧এডমিন সরিয়েছেন..!!
💗 ⎯͢✧ @${by}`,
          mentions: [target, promoter]
        },
        { quoted: msg }
      );

    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
