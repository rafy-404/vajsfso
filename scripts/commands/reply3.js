const fs = require("fs");
module.exports.config = {
  name: "ripley",
  version: "2.0.1",
  permission: 0,
  credits: "Rakib",
  description: "noprefix",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	let react = event.body.toLowerCase();
	if(react.includes("magi") || react.includes("bessa") || 
react.includes("খানকি মাগি") || 
react.includes("চুদানি") ||
react.includes("চুদা") ||
react.includes("চুদ") ||
react.includes("ভুদা") || 
react.includes("buda") || 
react.includes("gali") ||
react.includes("galibaz") ||        react.includes("সাওয়া") || 
react.includes("khanki") ||
react.includes("maderxud") ||
react.includes("xud") || 
react.includes("xuda") || 
react.includes("xudi") ||
react.includes("cuda") ||
react.includes("cudi") ||
react.includes("mgi") ||
react.includes("nodi") || 
react.includes("নডি") ||
react.includes("মাগি") ||
react.includes("মাদারচুদ") ||
react.includes("চুদ") ||
react.includes("বাল") ||
react.includes("চুদা") ||
react.includes("চুদি") || 
react.includes("ষুদা") ||
react.includes("ষুদি") ||
react.includes("bal") ||
react.includes("খাংকির পোলা") ||
react.includes("খানকি মাকি") ||
react.includes("খানকি মাগি") || 
react.includes("SawYa") || 
react.includes("Sawya") || 
react.includes("tor mare xudi") || react.includes("vuda") || react.includes("heda") || react.includes("bap")) {
		var msg = {
				body: "━━━━━━━━━━━━━━━━━━━━\n╭┈ ❒ 💬 | 𝐌𝐄𝐒𝐒𝐄𝐆𝐄:\n╰┈➤ এখানে গালাগালি করলে মুখ সেলাই কইরা দিমু..!!😾━━━━━━━━━━━━━━━━━━━━━━\n✿◕𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑: 𝐑𝐀𝐊𝐈𝐁 𝐂𝐇𝐎𝐖𝐃𝐇𝐔𝐑𝐘◕✿🌚!!😾"
			}
			api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🤬", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  } 
