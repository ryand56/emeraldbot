const discord = require('discord.js');
const utils = require('../global/utils');

module.exports.run = async (bot, message, args) => {

    let queue = bot.queue.get(message.guild.id);
    if (!queue) return [message.delete(), message.channel.send("⚠ No songs are being played.")];
    // utils.timed_msg('⚠ No musics are being played.', 5000)
    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(bot.user.avatarURL)
        .setDescription(`**-=- Music Queue -=-**\n${queue.musics.map(music => 
            `**-** ${music.title}`).join('\n')}`);

    message.channel.send(embed);

};

module.exports.help = {
    name: 'queue'
    // aliases: ['list', 'musiclist', 'songlist']
}