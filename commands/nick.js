const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    var target = message.mentions.users.first();

    let nick = args.join(" ").slice(22);

    var date = new Date();
    let embed = new Discord.RichEmbed()
    .setColor('#e00404')
    .setDescription(target + "'s nickname has been set to `" + nick + "`, " + message.author + ".")
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setFooter(`ID-${message.createdTimestamp}`)
    .setTimestamp()

    let embed2 = new Discord.RichEmbed()
    .setColor('#e00404')
    .setDescription(target + "'s nickname has been reset ," + message.author + ".")
    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
    .setFooter(`ID-${message.createdTimestamp}`)
    .setTimestamp()

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**:x: Invalid Permissions!**");
    if(!target) return message.channel.send("**:x: Please specify a user.**")
    if(!nick) return message.channel.send("**:x: Please enter a nickname.**")
    if(args[1] === 'reset'){
        message.guild.member(target).setNickname(target.username);
        message.channel.send(embed2);
    }
    else{
        message.channel.send(embed)
        message.guild.member(target).setNickname(nick);
    }
}

module.exports.help = {
    name: "nick"
}