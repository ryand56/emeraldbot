const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let channel = bot.channels.get("548283483475148810")
    let guild = bot.guilds.get("543239460419141635")
    if (!guild) return;
    if (!args.length) return message.channel.send("**Specify a link.**")
    let embed = new Discord.RichEmbed()
    .setAuthor("Whitelist request received")
    .setColor("#0000ff")
    .addField("User: ", message.author.username)
    .addField("User to whitelist: ", args[0])
    .setFooter(`ID-${message.author.id}`)
    .setTimestamp()

    channel.send(embed)
}

module.exports.help = {
    name: "whitelist"
}