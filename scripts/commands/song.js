const fs = require('fs');
const axios = require('axios');
const { resolve } = require('path');

async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if (!link) return 'Thiếu link';

  var resolveFunc = function () {};
  var rejectFunc = function () {};
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });

  try {
    // Request to the external API for downloading the music file
    const apiUrl = `http://5.78.114.238:5069/nayan/download/yt?url=${encodeURIComponent(link)}`;
    const response = await axios.get(apiUrl, { responseType: 'stream' });

    // Pipe the response data (music file) to the specified path
    response.data.pipe(fs.createWriteStream(path))
      .on("close", async () => {
        // Replace the metadata with data from API response or placeholder
        var data = {
          title: "Music Title",  // If available in the API, replace with actual data
          author: "Channel Name", // Replace with actual data
          viewCount: "10000", // Replace with actual data if available
          likes: "500", // Replace with actual data if available
          dur: 180, // Replace with actual data if available
          timestart: timestart
        };
        resolveFunc(data);
      });
  } catch (error) {
    rejectFunc(error);
  }

  return returnPromise;
}

module.exports.config = {
    name: "song",
    version: "1.0.0",
    permssion: 0,
    credits: "NAZRUL",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    prefix: "noprefix",
    category: "tiện ích",
    usages: "[searchMusic]",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { createReadStream, unlinkSync, statSync } = require("fs-extra");
  try {
    var path = `${__dirname}/cache/1.mp3`;
    var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body - 1], path);

    if (fs.statSync(path).size > 26214400) {
      return api.sendMessage('The file cannot be sent because the capacity is greater than 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
    }

    api.unsendMessage(handleReply.messageID);
    return api.sendMessage({
      body: `🎵 Title: ${data.title}\n🎶 Channel: ${data.author}\n⏱️ Duration: ${this.convertHMS(data.dur)}\n👀 Views: ${data.viewCount}\n🥰 Likes: ${data.likes}\n⏱️ Processing time: ${Math.floor((Date.now() - data.timestart) / 1000)} seconds\n💿==DISME PROJECT==💿\n===== 𝐍𝐀𝐙𝐑𝐔𝐋 𝐁𝐎𝐓 =====`,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  } catch (e) {
    return console.log(e);
  }
};

module.exports.convertHMS = function (value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - (hours * 3600)) / 60);
  let seconds = sec - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  return (hours != '00' ? hours + ':' : '') + minutes + ':' + seconds;
};

module.exports.run = async function ({ api, event, args }) {
  if (args.length == 0 || !args) {
    return api.sendMessage('» Please provide a song name or YouTube link.\n===== 𝐍𝐀𝐙𝐑𝐔𝐋 𝐁𝐎𝐓 =====', event.threadID, event.messageID);
  }

  const keywordSearch = args.join(" ");
  var path = `${__dirname}/cache/1.mp3`;

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  // Check if it's a URL
  if (args[0].indexOf("https://") === 0) {
    try {
      var data = await downloadMusicFromYoutube(args[0], path);

      if (fs.statSync(path).size > 26214400) {
        return api.sendMessage('Unable to send files because the capacity is greater than 25MB.', event.threadID, () => fs.unlinkSync(path), event.messageID);
      }

      return api.sendMessage({
        body: `🎵 Title: ${data.title}\n🎶 Channel: ${data.author}\n⏱️ Duration: ${this.convertHMS(data.dur)}\n👀 Views: ${data.viewCount}\n👍 Likes: ${data.likes}\n⏱️ Processing time: ${Math.floor((Date.now() - data.timestart) / 1000)} seconds\n💿==DISME PROJECT==💿\n===== 𝐍𝐀𝐙𝐑𝐔𝐋 𝐁𝐎𝐓 =====`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    } catch (e) {
      return api.sendMessage('Error downloading the song: ' + e, event.threadID, event.messageID);
    }
  } else {
    // Search logic (if the input is not a direct link)
    try {
      var link = [],
        msg = "",
        num = 0;
      const Youtube = require('youtube-search-api');
      var data = (await Youtube.GetListByKeyword(keywordSearch, false, 6)).items;

      for (let value of data) {
        link.push(value.id);
        num = num + 1;
        msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
      }

      var body = `Hello! Your list of ${link.length} songs is as follows:\n\n${msg} Please choose the number of the song you want and reply.\n===== 𝐍𝐀𝐙𝐑𝐔𝐋 𝐁𝐎𝐓 =====`;
      return api.sendMessage({
        body: body
      }, event.threadID, (error, info) => global.client.handleReply.push({
        type: 'reply',
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        link
      }), event.messageID);
    } catch (e) {
      return api.sendMessage('An error has occurred, please try again later.\n' + e, event.threadID, event.messageID);
    }
  }
};
