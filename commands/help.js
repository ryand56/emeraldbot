const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.react(`✅`)

    let helpembed = new Discord.RichEmbed()
    .setDescription("Help Menu")
    .setColor("#4cea41")
    .addField("Member Commands", "help, serverinfo, report, ping, getmembers, uptime")
    .addField("Mod Commands", "kick, warn, ban, mute, unmute, purge, reload, createchannel")
    .addField("Founder Commands", "eval")
    .addField("Fun Commands", "8ball")
    .addField("Reddit Commands", "cursedimage, technope, crappydesigns, meme")
    .addField("Voice Channel Commands", "play (WIP), search, disconnect, queue, skip, volume, pause, resume, stop, np")
    .addField("Roblox Commands", "whitelist")

    message.author.send(helpembed);
}

module.exports.help = {
    name: "help"
}