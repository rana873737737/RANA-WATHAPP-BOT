/**
 * Kick Command
 * Remove mentioned or replied users from the group
 * Includes robust self-kick prevention
 */

module.exports = {
  name: 'kick',
  aliases: ['remove'],
  category: 'admin',
  description: 'Kick mentioned/replied members from the group',
  usage: '.kick @user',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      const chatId = extra.from;
      const ctx = msg.message?.extendedTextMessage?.contextInfo;

      const mentioned = ctx?.mentionedJid || [];
      let usersToKick = [];

      // Mention করা ইউজার
      if (mentioned.length > 0) {
        usersToKick = mentioned;
      }
      // Reply করা ইউজার
      else if (ctx?.participant && ctx?.quotedMessage) {
        usersToKick = [ctx.participant];
      }

      // কাউকে সিলেক্ট না করলে
      if (usersToKick.length === 0) {
        return extra.reply(
          `⎯͢✧🥲 কাকে কিক দিবেন?\n\n▢ অনুগ্রহ করে একজনকে মেনশন করুন..! 🫰🐸`
        );
      }

      // Bot-কে Kick করা থেকে আটকানো
      const botId = (sock.user?.id || '').split(':')[0].split('@')[0];

      const tryingKickBot = usersToKick.some(user => {
        const id = user.split(':')[0].split('@')[0];
        return id === botId;
      });

      if (tryingKickBot) {
        return extra.reply(
          `⎯͢✧😒 আরে, আমাকে কি আমি নিজেই কিক দেব নাকি..! 🤦‍♂️`
        );
      }

      // Kick User
      await sock.groupParticipantsUpdate(
        chatId,
        usersToKick,
        'remove'
      );

      const mentions = usersToKick;
      const usernames = mentions.map(v => `@${v.split('@')[0]}`);

      await sock.sendMessage(
        chatId,
        {
          text: `⎯͢✧✅ ${usernames.join(', ')}

**-বোকাচোদা তুই এই গুরুপে থাকার যোগ্য না...!!* 🤧🤌🖕`,
          mentions
        },
        { quoted: msg }
      );

    } catch (err) {
      console.error(err);

      return extra.reply(
        `⎯͢✧❌ কিক করতে ব্যর্থ হয়েছি।

▢ নিশ্চিত করুন আমি গ্রুপের অ্যাডমিন আছি..।`
      );
    }
  }
};
