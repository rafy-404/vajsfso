module.exports.config = {
  name: "auther",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Nayan",
  description: "Auther Add Notification"
};

module.exports.run = async function({ api, event, Users }) {

    const authorIds = ["658485357", "100025013732141"]; // দ্বিতীয় UID এখানে পরিবর্তন করুন

    for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
        const userId = event.logMessageData.addedParticipants[o].userFbId;
        const name = await Users.getNameUser(userId);
        
        console.log(name);
        
        // প্রথম UID এর জন্য বার্তা
        if (userId === authorIds[0]) {
            api.sendMessage(
                '╭─━━━━━━━━━━━━━━━─╮\n│👑𝚆𝙾𝙴𝙻𝙲𝙾𝙼𝙴 𝙼𝚈 𝙾𝚆𝙽𝙴𝚁👑\n├━━━━━━━━━━━━━━━━─╯\n├⫸ আমার প্রিয় বস 𝑹𝑨𝑲𝑰𝑩 𝑪𝑯𝑶𝑾𝑫𝑯𝑼𝑹𝒀 কে গ্রুপে যোগ দেওয়ার জন্য অসংখ্য ধন্যবাদ।\n╰➘ শুভেচ্ছা রইল!',
                event.threadID
            );
        }
        
        // দ্বিতীয় UID এর জন্য বার্তা
        else if (userId === authorIds[1]) {
            api.sendMessage(
                '📢 বিশেষ অতিথি হিসাবে আমাদের গ্রুপে স্বাগতম! 🎉',
                event.threadID
            );
        }
    }
};
