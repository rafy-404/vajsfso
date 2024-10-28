module.exports.config = {
    name: "auther",
    eventType: ['message'],
    version: "1.0.0",
    credits: "Nayan",
    description: "Removes messages with specific emoji"
};

module.exports.run = async function({ api, event }) {
    const triggerEmoji = "✅"; // এই ইমোজি দিয়ে বার্তা শুরু হলে তা রিমুভ হবে

    if (event.body && event.body.startsWith(triggerEmoji)) {
        // বার্তা রিমুভ করা হবে
        api.deleteMessage(event.messageID, (err) => {
            if (err) {
                console.error("মেসেজ রিমুভ করতে সমস্যা:", err);
            }
        });
    }
};
