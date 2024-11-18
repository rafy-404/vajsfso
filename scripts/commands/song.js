const fs = require("fs-extra");
const axios = require("axios");
const ytdl = require("ytdl-core");
const Youtube = require("youtube-search-api");

module.exports = {
  config: {
    name: "song",
    version: "1.0.0",
    permission: 0,
    prefix: true,
    credits: "Nayan & Nazrul",
    description: "Play and download songs from YouTube.",
    category: "user",
    usages: "song <keyword/link>",
    cooldowns: 5,
  },

  convertHMS: function (value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec % 3600) / 60);
    let seconds = sec % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  },

  downloadMusicFromYoutube: async function (link, path) {
    const timestart = Date.now();
    return new Promise((resolve, reject) => {
      ytdl(link, { quality: "highestaudio" })
        .pipe(fs.createWriteStream(path))
        .on("close", async () => {
          const data = await ytdl.getInfo(link);
          resolve({
            title: data.videoDetails.title,
            duration: Number(data.videoDetails.lengthSeconds),
            viewCount: data.videoDetails.viewCount,
            likes: data.videoDetails.likes,
            author: data.videoDetails.author.name,
            timestart,
          });
        })
        .on("error", reject);
    });
  },

  handleReply: async function ({ api, event, handleReply }) {
    try {
      const choice = parseInt(event.body);
      if (isNaN(choice) || choice < 1 || choice > handleReply.link.length) {
        return api.sendMessage("❌ Invalid selection. Please try again.", event.threadID, event.messageID);
      }

      const videoUrl = `https://www.youtube.com/watch?v=${handleReply.link[choice - 1]}`;
      const audioPath = `${__dirname}/cache/audio.mp3`;
      const data = await this.downloadMusicFromYoutube(videoUrl, audioPath);

      if (fs.statSync(audioPath).size > 26214400) {
        return api.sendMessage(
          "❌ File size exceeds 25MB. Cannot send.",
          event.threadID,
          () => fs.unlinkSync(audioPath),
          event.messageID
        );
      }

      const message = `🎵 Title: ${data.title}\n🎶 Channel: ${data.author}\n⏱️ Duration: ${this.convertHMS(data.duration)}\n👀 Views: ${data.viewCount}\n👍 Likes: ${data.likes}\n⏱️ Process Time: ${Math.floor((Date.now() - data.timestart) / 1000)} seconds`;
      api.unsendMessage(handleReply.messageID);
      return api.sendMessage(
        { body: message, attachment: fs.createReadStream(audioPath) },
        event.threadID,
        () => fs.unlinkSync(audioPath),
        event.messageID
      );
    } catch (err) {
      console.error(err);
      return api.sendMessage("❌ An error occurred.", event.threadID, event.messageID);
    }
  },

  run: async function ({ api, event, args }) {
    if (!args[0]) {
      return api.sendMessage("❌ Please provide a YouTube link or search keyword.", event.threadID, event.messageID);
    }

    const query = args.join(" ");
    const audioPath = `${__dirname}/cache/audio.mp3`;
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

    if (query.startsWith("https://")) {
      try {
        const data = await this.downloadMusicFromYoutube(query, audioPath);
        if (fs.statSync(audioPath).size > 26214400) {
          return api.sendMessage(
            "❌ File size exceeds 25MB. Cannot send.",
            event.threadID,
            () => fs.unlinkSync(audioPath),
            event.messageID
          );
        }
        return api.sendMessage(
          {
            body: `🎵 Title: ${data.title}\n🎶 Channel: ${data.author}\n⏱️ Duration: ${this.convertHMS(data.duration)}\n👀 Views: ${data.viewCount}\n👍 Likes: ${data.likes}`,
            attachment: fs.createReadStream(audioPath),
          },
          event.threadID,
          () => fs.unlinkSync(audioPath),
          event.messageID
        );
      } catch (err) {
        console.error(err);
        return api.sendMessage("❌ An error occurred while downloading the audio.", event.threadID, event.messageID);
      }
    } else {
      try {
        const results = await Youtube.GetListByKeyword(query, false, 6);
        if (!results.items || results.items.length === 0) {
          return api.sendMessage("❌ No results found.", event.threadID, event.messageID);
        }

        const link = [];
        let msg = "🔍 Search Results:\n";
        results.items.forEach((video, index) => {
          link.push(video.id);
          msg += `${index + 1}. ${video.title} (${video.length.simpleText})\n\n`;
        });
        msg += "➡️ Reply with the number of the video to download.";

        return api.sendMessage(
          { body: msg },
          event.threadID,
          (error, info) =>
            global.client.handleReply.push({
              type: "reply",
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link,
            }),
          event.messageID
        );
      } catch (err) {
        console.error(err);
        return api.sendMessage("❌ An error occurred while searching.", event.threadID, event.messageID);
      }
    }
  },
};
