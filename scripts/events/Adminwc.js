module.exports.config = {
  name: "auther",
  eventType: ['log:subscribe'],
  version: "1.0.0",
  credits: "Nayan",
  description: "Auther Add Notification"
};

  module.exports.run = async function({ api, event, Users }) {

    for (let o = 0; o < event.logMessageData.addedParticipants.length; o++) {
  const name = await Users.getNameUser(event.logMessageData.addedParticipants[0].userFbId);

    console.log(name)
    const id = "658485357"
    var nameAuthor = await Users.getNameUser(id)
    console.log(nameAuthor)
    if (name == nameAuthor){

       api.sendMessage('╭─━━━━━━━━━━━━━━━─╮\n│👑𝚆𝙾𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 𝙼𝚈 𝙾𝚆𝙽𝙴𝚁👑\n├━━━━━━━━━━━━━━━━─╯\n├<> আমার বস রাকিব চৌধুরী রে অ্যাড দেয়ার জন্য। অসংখ্য অসংখ্য ধন্যবাদ।\n╰➘', event.threadID)
    }
}
  }
