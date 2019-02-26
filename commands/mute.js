const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
if(!member) return message.reply("You haven't mentioned a member!");
let muteRole = message.guild.roles.find("name", "muted");
if(!muteRole) return message.reply("Cannot find muted role.");
let params = message.content.split(" ").slice(1);
let time = params[1];
if(!time) return message.reply(`:no_entry_sign: You did not specify a time.`);

member.addRole(muteRole.id);
message.channel.send(`:white_check_mark: ${member.user.tag}, you have been muted for ${ms(ms)(time), {long: true}}`);

setTimeout(function() {
    member.removeRole(muteRole.id);
    message.channel.send(`${member.user.tag}, you have been unmuted.`);
}, ms(time));
}

module.exports.help = {
    name: "mute"
}