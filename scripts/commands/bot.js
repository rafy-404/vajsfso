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

    // ইউজার ইনপুট
    const prompt = args.join(" ").trim();
    const id = event.senderID;
    const name = await Users.getNameUser(id);

    // যদি ইউজার কিছু না লিখে
    if (!prompt) {
        return api.sendMessage(`${name}\nকিছু লিখুন!`, event.threadID, event.messageID);
    }

    try {
        // 🔹 1. নতুন API URL
        const apiUrl = "http://65.109.80.126:20392";

        // 🔹 2. বটের উত্তর সংগ্রহ করা (নতুন API ব্যবহার করে)
        let response = await axios.get(`${apiUrl}/sim?ask=${encodeURIComponent(prompt)}`);
        
        // যদি রেসপন্স ঠিকমতো না আসে
        if (!response.data || !response.data.data || !response.data.data.msg) {
            return api.sendMessage("⚠️ ভুল রেসপন্স এসেছে!", event.threadID, event.messageID);
        }

        const result = response.data.data.msg; // বটের উত্তর

        return api.sendMessage(result, event.threadID, event.messageID);

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return api.sendMessage("⚠️ দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};
