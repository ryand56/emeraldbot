let disc;
let b;
let conf;
let msg;
let a;
let g;

module.exports = {
    load: (discord, bot, config, message, args, guild) => {
        disc = discord;
        b = bot;
        conf = config;
        msg = message;
        a = args;
        g = guild;
    },

    timed_msg: (string, time) => {
        return msg.channel.send(string).then(msg => msg.delete(time));
    },

    no_perm: (error, message) => {
        let embed = new disc.RichEmbed()
        .setColor("#d30000")
        .setAuthor("Insufficient permissions", b.user.displayAvatarURL)
        .setThumbnail(b.user.avatarURL)
        .setDescription(error)
        .setFooter(`ID-${message.author.id} | Canary v1.0.1`)
        .setTimestamp()
        return embed;
    },

    cmd_fail: (error, syntax) => {
        let embed = new disc.RichEmbed()
        .setColor("8e0000")
        .setAuthor("Incorrect syntax", b.user.displayAvatarURL)
        .setThumbnail(b.user.avatarURL)
        .setDescription(error)
        .setFooter(`ID-${bot.user.id} | Canary v1.0.1`)
        return embed;
    }
}