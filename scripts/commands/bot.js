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
        // 🔹 1. API লিংক লোড করা
        const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
        const apiUrl = apiData.data.sim;
        const apiUrl2 = apiData.data.api2;

        // 🔹 2. বটের উত্তর সংগ্রহ করা (নতুন ফরম্যাট চেক)
        let response = await axios.get(`${apiUrl}/sim?ask=${encodeURIComponent(prompt)}`);
        
        // যদি রেসপন্স ঠিকমতো না আসে
        if (!response.data || !response.data.data || !response.data.data.msg) {
            return api.sendMessage("⚠️ ভুল রেসপন্স এসেছে!", event.threadID, event.messageID);
        }

        const result = response.data.data.msg; // বটের উত্তর

        // 🔹 3. ইউজারের জন্য ফন্ট স্টাইল লোড করা
        const textStyles = loadTextStyles();
        const userStyle = textStyles[event.threadID]?.style || "default";

        // 🔹 4. বটের উত্তরকে নির্দিষ্ট ফন্ট স্টাইলে রূপান্তর করা
        const fontResponse = await axios.get(`${apiUrl2}/bold?text=${encodeURIComponent(result)}&type=${userStyle}`);
        
        // যদি ফন্ট API ব্যর্থ হয়, তাহলে সাধারণ টেক্সট পাঠাও
        const finalText = fontResponse.data?.data?.bolded || result;

        return api.sendMessage(finalText, event.threadID, event.messageID);

    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return api.sendMessage("⚠️ দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};

// 🔹 5. ফন্ট স্টাইল লোড করার জন্য ডামি ফাংশন
function loadTextStyles() {
    return {
        "threadID1": { style: "bold" },
        "threadID2": { style: "italic" },
        // অন্য থ্রেড আইডি যুক্ত করতে পারো
    };
}
