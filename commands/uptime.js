const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Variables
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // define an embed
    let uptime = new Discord.RichEmbed()
    .setAuthor("Uptime")
    .setDescription(`The bot has been up for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`)
    .setColor("RANDOM")
    .setFooter(`ID-${message.member.id}`)
    .setTimestamp()
    message.channel.send(uptime)
}

module.exports.help = {
    name: "uptime"
}