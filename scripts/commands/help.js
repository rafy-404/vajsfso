
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] == "all") {
    const command = commands.values();
    var group = [],
      msg = "";
    for (const commandConfig of command) {
      if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
      else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
    }
    group.forEach(commandGroup => msg += `☂︎ ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} \n${commandGroup.cmds.join(' • ')}\n\n`);

    return axios.get('https://apikanna.maduka9.repl.co').then(res => {
      let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
      let admID = "100025013732141";

      api.getUserInfo(parseInt(admID), (err, data) => {
        if (err) {
          return console.log(err)
        }
        var obj = Object.keys(data);
        var firstname = data[obj].name.replace("@", "");
        let callback = function () {
          api.sendMessage({
            body: `Commands list\n\n` + msg + `\nSpamming the bot are strictly prohibited\n\nTotal Commands: ${commands.size}\n\nDeveloper:\n${firstname}`,
            mentions: [{
              tag: firstname,
              id: admID,
              fromIndex: 0,
            }],
            attachment: fs.createReadStream(__dirname + `/cache/472.${ext}`)
          }, event.threadID, (err, info) => {
            fs.unlinkSync(__dirname + `/cache/472.${ext}`);
            if (autoUnsend == false) {
              setTimeout(() => {
                return api.unsendMessage(info.messageID);
              }, delayUnsend * 1000);
            } else return;
          }, event.messageID);
        }
        request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/472.${ext}`)).on("close", callback);
      })
    });
  }

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 15;
    let i = 0;
    let msg = "";

    for (var [name, value] of commands) {
      name += ``;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const first = numberOfOnePage * page - numberOfOnePage;
    i = first;
    const helpView = arrayInfo.slice(first, first + numberOfOnePage);

    for (let cmds of helpView) msg += `│━━━━━━━━━━\n│${++i}➥${cmds}\n`;

    const siu = ` ╔═════•| 💜 |•═════╗\n ★  𝐑𝐀𝐊𝐈𝐁-𝐁𝐀𝐇𝐈-𝟎𝟎𝟕   ★\n╚═════•| 💜 |•═════╝\n\n━❮●❯━━━━━❪💝❫━━━━━❮●❯━\n\n╭━─━─━─━≪✠≫━─━─━─━╮`;

 const text = `╰━─━─━─━≪✠≫━─━─━─━╯\n\n╭━─━─━─━≪✠≫━─━─━─━╮\n│𝐏𝐀𝐆𝐄   (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n│𝗧𝘆𝗽𝗲: °${prefix}𝗛𝗲𝗹𝗽°\n│𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${arrayInfo.length}\n│𝐓𝐎𝐓𝐀𝐋 𝐔𝐒𝐄𝐑 :-  ${global.data.allUserID.length}\n╰━─━─━─━≪✠≫━─━─━─━╯\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n★𝙊𝙒𝙉𝙀𝙍-𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆-𝙇𝙄𝙉𝙆★👇\n\nhttps://www.facebook.com/SYSTEM.ERROR.KING\n\n★𝙊𝙒𝙉𝙀𝙍-𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣-𝗡𝗔𝗠𝗕𝗘𝗥★👇\n\nwa.me/01771306867\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nᥬ🥶᭄  ᥬ😳᭄ ᥬ😝᭄  ᥬ🙄᭄ ᥬ😱᭄ ᥬ🤡᭄  ᥬ🥵᭄\n━❮●❯━━━━━❪💝❫━━━━━❮●❯━\n★★★▰▱▰▱▰▱▰▰▱▰▱▰▱▰▱▰▱▰★★★\n  - যেমন ভাবে ব্যবহার করবা তেমন সার্ভিস দেয়া হবে...!! 🫰🤙\n             (ধন্যবাদ) \n★▰▱▰▱▰▱▰▰▱▰▱▰▱▰▱▰▱▰★━━`;
    var link = [		"https://i.imgur.com/ZdkPGbg.jpeg",
    ]
    var callback = () => api.sendMessage({ body: siu + "\n\n" + msg + text, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
  }

  const leiamname = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  var link = [
    "https://i.imgur.com/ZdkPGbg.jpeg",
  ]
  var callback = () => api.sendMessage({ body: leiamname, attachment: fs.createReadStream(__dirname + "/cache/leiamnashelp.jpg") }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashelp.jpg"), event.messageID);
  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashelp.jpg")).on("close", () => callback());
};
