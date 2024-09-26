module.exports.config = {
    name: "npm",
    version: "1.0.0",
    permission: 0,
    credits: "rahad",
    prefix: true,
    description: "NPM Package information",
    category: "npm",
    usages: "/npm [packageName]",
    cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const packageName = encodeURIComponent(args.join(" "));

    if (!args[0]) return api.sendMessage("Please type a package name...", tid, mid);

    try {
        const apiUrl = `https://npm-packages-information.mohammad-rahad.repl.co/npm?packageName=${packageName}`;
        const res = await axios.get(apiUrl);
        const packageInfo = res.data;

        const response = JSON.stringify(packageInfo, null, 2);

        api.sendMessage(response, tid, (error, info) => {
            if (error) {
                console.error(error);
            }
        }, mid);
    } catch (error) {
        console.error(error);
        api.sendMessage("❐ 𝚂𝙷𝙰𝙾𝙽 6𝚇 𝚂𝙴𝚁𝚅𝙴𝚁 𝙱𝚄𝚂𝚈 𝙽𝙾𝚆 💔🥀", tid, mid);
    }
};
