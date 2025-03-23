module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "sk",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require("axios");
    const prompt = args.join(" ");
    const id = event.senderID;
    const name = await Users.getNameUser(event.senderID);

    const tl = ["ckk"];
    const rand = tl[Math.floor(Math.random() * tl.length)];

    if (!prompt) return api.sendMessage(`${name}\n${rand}`, event.threadID, event.messageID);

    try {
        const response = await axios.get(`http://65.109.80.126:20392/sim?ask=${encodeURIComponent(prompt)}`);
        const result = response.data.reply;

        return api.sendMessage(result, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};
