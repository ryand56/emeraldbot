const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let queue = bot.queue.get(message.guild.id);
    if (!queue) return [message.delete(), message.channel.send("⚠ No songs are being played.")];
    let embed = new Discord.RichEmbed()
    .setAuthor("Now playing")
    .addField(`🎵 **Currently Playing:**`, queue.musics[0].title)
    // .addField("Duration: ", queue.musics[0].length)
    .setFooter(`ID-${message.member.id}`)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send(embed)
}

module.exports.help = {
    name: "np"
}