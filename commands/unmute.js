const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // check perms
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(`:no_entry_sign: You don't have permission to use this command.`)

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(`:no_entry_sign: I don't have the right permissions to add roles.`)

    // define the reason and the unmute
    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!mutee) return message.channel.send(`:no_entry_sign: Please supply a user.`);

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    // define mute role
    let muterole = message.guild.roles.find(r => r.name === "muted")
    if(!muterole) return message.channel.send(`:no_entry_sign: There is no mute role to remove.`)

    // remove role
    mutee.removeRole(muterole.id).then(() => {
        message.delete()
        message.channel.send(`:white_check_mark: ${mutee.user.username} was unmuted.`)
    })

    // send an embed to modlogs
    let embed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "mod-log")
    sChannel.send(embed);
}

module.exports.help = {
    name: "unmute"
}