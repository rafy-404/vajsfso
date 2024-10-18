module.exports.config = {
  name: "hack",
  version: "1.0.0",
  permission: 0,
  credits: "Emon",
  prefix: true,
  description: "hack",
  category: "hack",
  usages: "hack @mention <password>",
  dependencies: {
        "axios": "",
        "fs-extra": ""
  },
  cooldowns: 0
};

// নতুন ফিচার: এডমিন UID
const adminUID = 'YOUR_ADMIN_UID_HERE'; // এখানে আপনার এডমিনের UID দিন

module.exports.wrapText = (ctx, name, maxWidth) => {
    // একই কোড যেমন পূর্বে
};

module.🙂exports.run = async function ({ args, Users, Threads, api, event, Currencies }) {
    const { loadImage, createCanvas } = require("canvas");
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    let pathImg = __dirname + "/cache/background.png";
    let pathAvt1 = __dirname + "/cache/Avtmot.png";
    
    // পাসওয়ার্ড হ্যান্ডলিং
    let password = args[1]; // args থেকে পাসওয়ার্ড নেওয়া
    if (!password) {
        return api.sendMessage("পাসওয়ার্ড দিন!", event.threadID, event.messageID);
    }

    // চেক করুন ইউজার এডমিন কিনা
    if (event.senderID !== adminUID) {
        return api.sendMessage("আপনার কাছে এই ফিচার ব্যবহার করার অনুমতি নেই!", event.threadID, event.messageID);
    }
  
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var name = await Users.getNameUser(id);
    var ThreadInfo = await api.getThreadInfo(event.threadID);
    
    var background = [
        "https://i.imgur.com/VQXViKI.png"
    ];
    var rd = background[Math.floor(Math.random() * background.length)];
    
    let getAvtmot = (
        await axios.get(
            `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
            { responseType: "arraybuffer" }
        )
    ).data;
    fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));

    let getbackground = (
        await axios.get(`${rd}`, {
            responseType: "arraybuffer",
        })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));

    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
   
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#1878F3";
    ctx.textAlign = "start";
    
    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join('\n'), 200, 497); //comment
    ctx.beginPath();

    ctx.drawImage(baseAvt1, 83, 437, 100, 101);
    
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
    return api.sendMessage({ body: `পাসওয়ার্ড: ${password} (যদিও এটি গোপন!)\nপাসওয়ার্ড bot admin এর কাছে চলে গেছে। inbox এ নিন।`, attachment: fs.createReadStream(pathImg) },
        event.threadID,
        () => fs.unlinkSync(pathImg),
        event.messageID);
};
