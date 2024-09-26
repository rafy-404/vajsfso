module.exports.config = {
	name: "sada",
  version: "1.0.0",
  permission: 1,
  credits: "SIDDIK",
  description: "blast the bos in 1 sec",
  prefix: true, 
  category: "test", 
  usages: "addmin",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
 
module.exports.run = function ({ api, event, Users }) {
  var { threadID, messageID } = event;
  var k = function (k) { api.sendMessage(k, threadID)};
 
  //*vonglap
 
for (i = 0; i < 400; i++) {
 k("Ⓡ︎Ⓐ︎Ⓚ︎Ⓘ︎Ⓑ︎");
}
 
  }
