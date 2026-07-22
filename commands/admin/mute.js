/**
 * Mute Command - Close group (only admins can send)
 */

module.exports = {
    name: 'mute',
    aliases: ['close', 'closegroup'],
    category: 'admin',
    description: 'Close group (only admins can send messages)',
    usage: '.mute',
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true,

    async execute(sock, msg, args, extra) {
        try {
            // Close Group
            await sock.groupSettingUpdate(extra.from, 'announcement');

            await extra.reply(`*—আসসালামু আলাইকুম_ᴇᴠᴇʀʏᴏɴᴇ🤍*

— *𝐆ᴏʀᴜᴩ 𝐎ꜰꜰ..!!🌷❤️‍🩹*

*— \`\`\`𝐎ᴩᴇɴ 𝐓ɪᴍᴇ —কোনো এডমিন একটিভ হলে খোলা হবে.....🌷*

*— আল্লাহ হাফিজ..:)* 🎀🦥

*— 𝐀ʟʟ"🤲🏻😌*

*— 𝐘ᴏᴜʀ 𝐅ᴀᴠᴏʀɪᴛᴇ 𝐀ᴅᴍɪɴ 🤍*`);

        } catch (error) {
            console.error('Mute Error:', error);

            await extra.reply(`⎯͢✧❌ 𝐄ʀʀᴏʀ 🐱

${error.message}`);
        }
    }
};
