module.exports.config = {
    name: "bot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Rakib",
    description: "better than all Sim simi",
    usePrefix: true,
    prefix: "awto",
    category: "user",
    commandCategory: "ChatBots",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, Users }) {
    const axios = require("axios");
    const prompt = args.join(" ");
    const id = event.senderID;
    const name = await Users.getNameUser(event.senderID);

    const tl = [
        "\n- হুম বাবু বলো কি বলবা সোনা-!!😘😊",
        "\n অহ আমার বাবু টা আমি এই তো সোনা ডেকো না আর-!!😍❤️",
        "\n\n- বাবু আমাকে দাকলে কিছু বলবা বাবু-!!✨🤍🤭",
        "\nএই তো বাবু আমি এখানে হারিয়ে জাইনি তো সোনা-!!🙈😽",
        "\n না বাবু সোনা আমার তুমার কথা এখন থেকে আর শুনবো না আর তুমার সাথে আরি-!!😌😾",
        "\n\nকার দেওয়া ফুল খোঁপার চুলে তুমার ওই মুখে আমার নাম নিবা না আর অন্য মেয়েদের ডাকো গা যাও-!!😭😈",
        "\nতুমি আর আমার সাথে কথা বলবা না।\n তুমি কাল পাসের বাড়ির ভাবির সাথে কি করসো-!!🤬😤",
        "\n আমাকে আর বাবু ডাকবে না..!😾\nতুমার আব্বুর কাছে নালিশ দিবো আমি..!😤\n তুমি ভাবি দের সাথে খারাপ কাজ কর-!!😈😭",
        "\nকোন সাহ্যসে তুমি আমাকে ডাকো তুমি একটা লুচ্চা-!!😈",
        "\n অলে বাবু টা লে আমার__😘😍\n কি হয়েছে সোনা তুমার-!!😔\n ডাকলে যে...??",
        "\n - হুম বাবু পরে কথা হবে এখন রাখি-!!😘😍🥹",
        "\n i love",
        "\n - হুম বাবু রান্না কবো এখন পরে কথা বলি-!!😊😔",
    ];

    const rand = tl[Math.floor(Math.random() * tl.length)];

    if (!prompt) return api.sendMessage(`${name}\n${rand}`, event.threadID, event.messageID);

    try {
        const response = await axios.get(`http://5.9.12.94:14642/sim?ask=${encodeURIComponent(prompt)}`);
        const result = response.data.reply;

        return api.sendMessage(result, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};
