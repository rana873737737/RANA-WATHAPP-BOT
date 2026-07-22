const os = require('os');
const config = require('../../config');

module.exports = {
  name: 'info',
  aliases: ['about', 'admininfo', 'serverinfo'],
  category: 'utility',
  description: 'Show admin and server information',
  usage: '.info',

  async execute(sock, msg, args, extra) {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const infoMessage = `--------------------------------------------
╭────《 𝐌ʏ 𝐒ᴇʟꜰ 》────⊷
│ ╭────────✧❁✧────────◆
│ │ 🌸 𝐍ꫝᴍᴇ :- 𝐒ʜꫝʜɪɴ 𝐑ꫝɴꫝ
│ │ 🏡 𝐅ʀᴏᴍ :- 𝐒ʏʟʜᴇᴛ
│ │ 📘 𝐂ʟꫝss :- 𝐈ɴᴛᴇʀ 𝟏sᴛ 𝐘ᴇꫝʀ
│ │ 💖 𝐑ᴇʟꫝᴛɪᴏɴ :- 𝐌ꫝʀʀɪᴇᴅ ❤️💍
│ │ 🎯 𝐇ᴏʙʙʏ :- 𝐉ꫝɴɪɴꫝ 😒
│ │ ☎️ 𝐍ᴜᴍʙᴇʀ :- 𝟎𝟏𝟑𝟒𝟕𝟑𝟎𝟎𝟎𝟗𝟓
│ │ 🤖 𝐁ᴏᴛ :- 𝐗-𝐒ʜꫝʜɪɴ🌷
│ ╰────────✧❁✧────────◆
╰══════════════════════⊷
--------------------------------------------

🖥️ *Server Info:*
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`;

      await sock.sendMessage(extra.from, {
        image: { url: "https://i.ibb.co.com/BHvWrzG2/1768616020605.png" }, 
        caption: infoMessage,
        mentions: [extra.sender]
      }, { quoted: msg });

    } catch (error) {
      console.error(error);
      await extra.reply('❌ An error occurred while fetching info.');
    }
  },
};
