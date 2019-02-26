const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let verified = message.member.guild.roles.find("name", "Verified")
    let unassigned = message.member.guild.roles.find("name", "Unassigned")

    message.member.addRole(verified)
    message.member.removeRole(unassigned)
}

module.exports.help = {
    name: "verify"
}