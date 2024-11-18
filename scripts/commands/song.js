const fs = require("fs");
const ytdl = require("ytdl-core");
const Youtube = require("youtube-search-api");

module.exports.config = {
  name: "song",
  version: "1.0.0",
  permission: 0,
  credits: "Nazrul",
  description: "Download and play music from YouTube",
  prefix: "noprefix",
  category: "utility",
  usages: "[searchMusic]",
  cooldowns: 0,
};

async function downloadMusicFromYoutube(link, path) {
  const startTime = Date.now();
  return new Promise(async (resolve, reject) => {
    try {
      ytdl(link, {
        filter: (format) =>
          format.quality === "tiny" && format.audioBitrate === 48 && format.hasAudio,
      })
        .pipe(fs.createWriteStream(path))
        .on("close", async () => {
          const info = await ytdl.getInfo(link);
          resolve({
            title: info.videoDetails.title,
            duration: Number(info.videoDetails.lengthSeconds),
            views: info.videoDetails.viewCount,
            likes: info.videoDetails.likes,
            channel: info.videoDetails.author.name,
            processTime: Math.floor((Date.now() - startTime) / 1000),
          });
        });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports.handleReply = async function ({ api, event, handleReply }) {
  try {
    const path = `${__dirname}/cache/audio.mp3`;
    const videoId = handleReply.link[event.body - 1];
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const musicData = await downloadMusicFromYoutube(videoUrl, path);

    if (fs.statSync(path).size > 26214400) {
      return api.sendMessage(
        "❌ The file size exceeds 25MB and cannot be sent.",
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    }

    api.unsendMessage(handleReply.messageID);
    api.sendMessage(
      {
        body: `🎵 Title: ${musicData.title}\n🎶 Channel: ${musicData.channel}\n⏱️ Duration: ${this.convertHMS(
          musicData.duration
        )}\n👀 Views: ${musicData.views}\n👍 Likes: ${musicData.likes}\n⏱️ Process Time: ${musicData.processTime}s`,
        attachment: fs.createReadStream(path),
      },
      event.threadID,
      () => fs.unlinkSync(path),
      event.messageID
    );
  } catch (err) {
    console.error(err);
    api.sendMessage(
      "❌ An error occurred while processing your request. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.convertHMS = function (value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec % 3600) / 60);
  let seconds = sec % 60;
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return (hours !== "00" ? hours + ":" : "") + minutes + ":" + seconds;
};

module.exports.run = async function ({ api, event, args }) {
  if (!args.length) {
    return api.sendMessage(
      "❌ Please provide a YouTube link or search keyword.",
      event.threadID,
      event.messageID
    );
  }

  const input = args.join(" ");
  const path = `${__dirname}/cache/audio.mp3`;
  if (fs.existsSync(path)) fs.unlinkSync(path);

  if (input.startsWith("https://")) {
    try {
      const musicData = await downloadMusicFromYoutube(input, path);
      if (fs.statSync(path).size > 26214400) {
        return api.sendMessage(
          "❌ File size exceeds 25MB. Cannot send.",
          event.threadID,
          () => fs.unlinkSync(path),
          event.messageID
        );
      }

      api.sendMessage(
        {
          body: `🎵 Title: ${musicData.title}\n🎶 Channel: ${musicData.channel}\n⏱️ Duration: ${this.convertHMS(
            musicData.duration
          )}\n👀 Views: ${musicData.views}\n👍 Likes: ${musicData.likes}\n⏱️ Process Time: ${musicData.processTime}s`,
          attachment: fs.createReadStream(path),
        },
        event.threadID,
        () => fs.unlinkSync(path),
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.sendMessage(
        "❌ An error occurred while downloading the music.",
        event.threadID,
        event.messageID
      );
    }
  } else {
    try {
      const results = await Youtube.GetListByKeyword(input, false, 6);
      if (!results.items.length) {
        return api.sendMessage(
          "❌ No results found for your query.",
          event.threadID,
          event.messageID
        );
      }

      const links = [];
      let message = "🔍 Search Results:\n";
      results.items.forEach((video, index) => {
        links.push(video.id);
        message += `${index + 1}. ${video.title} (${video.length.simpleText})\n\n`;
      });

      message += "➡️ Reply with the number of the song you want to download.";
      return api.sendMessage(
        { body: message },
        event.threadID,
        (error, info) =>
          global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            link: links,
          }),
        event.messageID
      );
    } catch (err) {
      console.error(err);
      api.sendMessage(
        "❌ An error occurred while searching for songs.",
        event.threadID,
        event.messageID
      );
    }
  }
};
