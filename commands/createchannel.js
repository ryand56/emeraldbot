const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(":no_entry_sign: You cannot create a channel!")
    message.guild.createChannel(args[0], args[1])
    let embed = new Discord.RichEmbed()
    .setAuthor(`Created ${args[0]}`)
    .setDescription(`:white_check_mark: Successfully created ${args[0]} as ${args[1]}`)
    .setColor("RANDOM")
    .setFooter(`ID-${message.member.id}`)
    .setTimestamp()
    message.channel.send(embed)
}

module.exports.help = {
    name: "createchannel"
}