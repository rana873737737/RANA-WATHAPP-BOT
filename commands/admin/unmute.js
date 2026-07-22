/**
 * Unmute Command - Open group (all members can send)
 */

module.exports = {
    name: 'unmute',
    aliases: ['open', 'opengroup'],
    category: 'admin',
    description: 'Open group (all members can send messages)',
    usage: '.unmute',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,

    async execute(sock, msg, args, extra) {
        try {
            // Open Group
            await sock.groupSettingUpdate(extra.from, 'not_announcement');

            await extra.reply(`*—𝐀ꜱꜱʟᴀᴍᴜᴀʟᴀɪᴋᴜᴍ ᴇᴠᴇʀʏᴏɴᴇ🤍*

— *𝐆ᴏʀᴜᴩ 𝐎𝐍..🌷❤️‍🩹*

*—সবাই মিলে আড্ডা দাও আবার..!!🫠❤️*

*— 𝐒ʜᴀʜɪɴ 𝐑ᴀɴꫝᥫ᭡ 🤍*`);

        } catch (error) {
            console.error('Unmute Error:', error);

            await extra.reply(`*⎯͢✧❌ 𝐄ʀʀᴏʀ 🐱*\n\n${error.message}`);
        }
    }
};
