const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "+";

bot.on("ready", () => {
    console.log("Bot ready");
});

bot.on("message", (message) => {
if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    } else

    if (message.content.startsWith(prefix + "hi")) {
        message.channel.send("hello");
    }
});


bot.login("put bot token here");