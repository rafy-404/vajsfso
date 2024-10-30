const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "aick",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  prefix: true,
  description: "make friends via facebook id",
  category: "admin",
  usages: "uid",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  const prompt = args.join(" ");
  if (!prompt) {
    return api.sendMessage("Please provide a prompt", event.threadID, event.messageID);
  }

  const startTime = Date.now();

  try {
    const res = await axios.get(`https://www.x-noobs-api.000.pe/m/artSketch?prompt=${encodeURIComponent(prompt)}`);
    const imageUrl = res.data.imgUrl;

    const imageResponse = await axios({
      url: imageUrl,
      responseType: 'arraybuffer'
    });

    const imagePath = path.join(__dirname, "image.png");

    fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    await api.sendMessage({
      body: `✅✨ Here's Your Sketch image✨\n\n✨Prompt: ♡ ${prompt} ♡\n💫 Process time: ♡ ${timeTaken} seconds ♡\n`,
      attachment: fs.createReadStream(imagePath)
    }, event.threadID, event.messageID);

    fs.unlinkSync(imagePath);

  } catch (error) {
    await api.sendMessage(`💔 Error: ${error.message}`, event.threadID, event.messageID);
  }
};
