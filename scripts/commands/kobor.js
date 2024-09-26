module.exports.config = {
 name: "kobor",
 version: "1.0.1", 
 permission: 0,
 credits: "nazrul",
 prefix: true,
description: "Admin info",
category: "...",
 cooldowns: 1,
dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
var link =["https://i.imgur.com/wJZCJDt.mp4","https://i.imgur.com/tvl71V8.mp4","https://i.imgur.com/MddkgxW.mp4",];

var callback = () => api.sendMessage({body:` ===== কবরের ডাক =====
=======================
প্রতি দিন ডাকি তোমায়
              নেই কোন চেতনা,,
সময় থাকিতে কর,
              পরকালের সাধনা।।।

ডাকার মত ডাকব একদিন
              আমি  অন্ধকার কবর,,
আসতে হবে আমার কোলে, 
              রাখনা কোন খবর।।

 সাপ বিচ্ছু  আজব গজব
              থাকবে তুমি একলা,,,
 তোমার যে দিন ডাক পরিবে,
              পরবে কান্নার মেলা।।

ছেলে মেয়ে কাঁদবে সবাই
             কেউ হবে না সাথী,,,
আমি কবর নিজর্ন গৃহ, 
             কেউ দিবে না বাতি।।

তোমার সম্বল ঈমানের বল
             হিসাব হবে পথে,,,
 শান্তি যদি পেতে চাও
            আমল আনিও সাথে।।।\=====================
✢━━━━━━━━━━━━━━━✢
----❖----- 𝐍𝐀𝐙𝐑𝐔𝐋 -----❖----
`,attachment: fs.createReadStream(__dirname + "/cache/juswa.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.mp4")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.mp4")).on("close",() => callback());
   };