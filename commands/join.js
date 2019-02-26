const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.member.voiceChannel)
    {
        message.member.voiceChannel.join()
        .then(connection =>{
            message.reply(":white_check_mark: **Joined!**");
        })
    }
    else
    {
        message.reply(":no_entry_sign: **You are not in a voice channel!**");
    }
}

module.exports.help = {
    name: "join"
}