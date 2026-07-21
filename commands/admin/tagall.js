/**
 * Tag All Command - Mention all group members
 */

module.exports = {
  name: 'tagall',
  aliases: ['mentionall', 'everyone'],
  category: 'admin',
  description: 'Tag all group members',
  usage: '.tagall <message>',
  groupOnly: true,
  adminOnly: true,
  botAdminNeeded: true,

  async execute(sock, msg, args, extra) {
    try {
      const customMessage = args.join(' ');

      const participants = extra.groupMetadata.participants;
      const mentions = participants.map(p => p.id);

      const emojis = [
        "│🌸 ᩧ𝆺ྀི𝅥",
        "│👑 ᩧ𝆺ྀི𝅥",
        "│🎀 ᩧ𝆺ྀི𝅥",
        "│🦋 ᩧ𝆺ྀི𝅥",
        "│💎 ᩧ𝆺ྀི𝅥",
        "│🎾 ᩧ𝆺ྀི𝅥",
        "│🎈 ᩧ𝆺ྀི𝅥",
        "│🧁 ᩧ𝆺ྀི𝅥",
        "│🍿 ᩧ𝆺ྀི𝅥",
        "│🪀 ᩧ𝆺ྀི𝅥"
      ];

      let text = `
⎯͢✧🫣 𝐆ʀᴏᴜᴘ 𝐓ᴀɢ 𝐀ʟʟ 🐱
⎯͢✧━━━━━━━━━━━━━━━✧
▢ 𝐆ʀᴏᴜᴘ : ${extra.groupMetadata.subject}
▢ 𝐌ᴇᴍʙᴇʀ : ${participants.length}
▢ 𝐍ᴏᴛɪᴄᴇ : 💗 𝐀ᴛᴛᴇɴᴛɪᴏɴ 𝐄ᴠᴇʀʏᴏɴᴇ 💗

${customMessage ? `📝 *𝐌ᴇ𝐬𝐬ᴀɢᴇ :* ${customMessage}\n` : ""}

╭┈─「 👑 𝐀ʟʟ 𝐌ᴇᴍʙᴇʀ𝐬 」┈❍
`;

      participants.forEach((participant, index) => {
        const emoji = emojis[index % emojis.length];
        text += `${emoji} @${participant.id.split('@')[0]}\n`;
      });

      text += `
╰────────────❍

⎯͢✧━━━━━━━━━━━━━━━✧
💬 𝐒ᴇɴᴛ 𝐁ʏ : ⎯͢✧🫣 𝐒ʜꫝʜɪɴ 𝐑ᴀɴꫝᥫ᭡ 🐱
💗 𝐒ᴛᴀʏ 𝐀ᴄᴛɪᴠᴇ • 𝐒ᴛᴀʏ 𝐒ᴛʏʟɪ𝐬ʜ ✨
⎯͢✧━━━━━━━━━━━━━━━✧
`;

      await sock.sendMessage(
        extra.from,
        {
          text,
          mentions
        },
        { quoted: msg }
      );

    } catch (error) {
      console.error("TagAll Error:", error);

      await extra.reply("⎯͢✧❌ 𝐒ᴏʀʀʏ 𝐄ʀʀᴏʀ 🐱");
    }
  }
};
