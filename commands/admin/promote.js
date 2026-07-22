/**
 * Promote Command - Make member admin
 */

const { findParticipant } = require('../../utils/jidHelper');

module.exports = {
  name: 'promote',
  aliases: ['makeadmin'],
  category: 'admin',
  description: 'Promote member to admin',
  usage: '.promote @user',
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
      } else if (ctx?.participant && ctx?.stanzaId && ctx?.quotedMessage) {
        target = ctx.participant;
      } else {
        return extra.reply(
          '❌ Please mention or reply to the user to promote!\n\nExample: .promote @user'
        );
      }

      // Fresh group metadata
      const freshMetadata = await sock.groupMetadata(extra.from);

      // Find participant
      const foundParticipant = findParticipant(
        freshMetadata.participants,
        target
      );

      if (!foundParticipant) {
        return extra.reply('❌ User not found in group!');
      }

      // Already admin check
      if (
        foundParticipant.admin === 'admin' ||
        foundParticipant.admin === 'superadmin'
      ) {
        return extra.reply('❌ This user is already an admin!');
      }

      // Promote member
      await sock.groupParticipantsUpdate(extra.from, [target], 'promote');

      const promoter =
        msg.key.participant || extra.sender || msg.key.remoteJid;

      const user = target.split('@')[0];
      const by = promoter.split('@')[0];

      await sock.sendMessage(
        extra.from,
        {
          text: `-অভিনন্দন......!!💫✨
@${user}

-আজ থেকে তুমি এই গুরুপের এডমিন...!!🌷🥹🎀

💗 এডমিন দিয়েছেন..!!
@${by}`,
          mentions: [target, promoter]
        },
        { quoted: msg }
      );

    } catch (error) {
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
