const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.guild.voiceConnection)
    {
        message.guild.voiceConnection.disconnect();
    }
    else
    {
        let embed = new Discord.RichEmbed()

        .setAuthor("Failed leaving voice channel")
        .setDescription("I am not in a voice channel!")
        .setColor("#ff0000")
        .setFooter(`ID-${message.author.id} | Canary v1.0.1`)
    }
}

module.exports.help = {
    name: "disconnect"
}