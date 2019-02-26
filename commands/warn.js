const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    //e!warn @EmeraldBot-Dev <reason>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply(":no_entry_sign: **User has manage members, or is higher than you.**");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Could not find user.");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply(":no_entry_sign: **User has the manage messages permission.**");
    let reason = args.join(" ").slice(22);

    if(!warns[wUser.id]) warns[wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    message.reply(":white_check_mark: **Successfully warned!**")

    fs.writeFile("./warnings", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Warned User", wUser.username)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason)

    let warnchannel = message.guild.channels.find(`name`, "mod-log");
    if(!warnchannel) return message.reply("Could not find the warning channel.");

    warnchannel.send(warnEmbed)

    if(warns[wUser.id].warns == 5){
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole) return message.reply("Could not find muted role.");

        let mutetime = "1m";
        await(wUser.addRole(muterole.id));
        message.channel.send(`${wUser.tag} has been temporarily muted for ${mutetime}.`)

        setTimeout(function(){
            wUser.removeRole(muterole.id)
            message.channel.reply(`They have been unmuted.`)
        })
    }
    if(warns[wUser.id].warns == 10){
        message.guild.member(wUser).ban(reason);
        message.channel.send(`${wUser.tag} has been banned.`)
    }
}

module.exports.help = {
    name: "warn"
}