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
    const name = await Users.getNameUser(id);

    // Random fallback message
    const tl = ["ckk"];
    const alif = tl[Math.floor(Math.random() * tl.length)];

    if (!prompt) return api.sendMessage(`${name}\n${alif}`, event.threadID, event.messageID);

    try {
        // Fetch API URLs from external source
        const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
        const apiUrl = apiData.data.sim;
        const apiUrl2 = apiData.data.api2;

        // Get bot response
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(prompt)}`);
        const result = response.data.data.msg;

        // Load text styles
        const textStyles = loadTextStyles();
        const userStyle = textStyles[event.threadID]?.style || "default";

        // Apply font style
        const fontResponse = await axios.get(`${apiUrl2}/bold?text=${encodeURIComponent(result)}&type=${userStyle}`);
        const text = fontResponse.data.data.bolded;

        return api.sendMessage(text, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage("দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", event.threadID, event.messageID);
    }
};

// Dummy function for loading text styles
function loadTextStyles() {
    return {
        "threadID1": { style: "bold" },
        "threadID2": { style: "italic" },
        // Add more as needed
    };
}
