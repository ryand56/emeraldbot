const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    async function purge() {
        message.delete()

        if (!message.member.roles.find("name", "Bot Tester")) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Role required")
            .setDescription("You need the bot tester role!")
            .setFooter(`ID-${message.author.id} | Canary v1.0.1`)
            .setTimestamp()
            message.channel.send(embed)
            return;
        }
        if (isNaN(args[0])) {
            message.channel.send(":no_entry_sign: **Please specify a number**")
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]});
        console.log(fetched.size + "messages found, deleting...")

        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(":name_badge: **Error deleting messages**"))
    }
    purge();
}

module.exports.help = {
    name: "purge"
}