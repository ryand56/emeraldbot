const Discord = require("discord.js");
// get the ytdl core
const ytdl = require("ytdl-core");
const utils = require("../global/utils")
const config = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    let VC = message.member.voiceChannel;
    if (!VC) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, please join a voice channel!`, `${config.prefix}play <music/url>`), 5000)];

    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    let pl = /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/

    let searchString = args.join(' ');
    if (!url || !searchString) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, please enter a music name or url!`, `${config.prefix}play <music/url>`), 5000)];

    let perms = VC.permissionsFor(message.client.user);
    if (!perms.has('CONNECT')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, I do not have permissions to connect to voice channels!`, `${config.prefix}play <music/url>`), 5000)];
    if (!perms.has('SPEAK')) return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, I do not have permissions to speak in a voice channel`, `${config.prefix}play <music/url>`), 5000)];

    if (url.match(pl)) {
        let playlist = await bot.youtube.getPlaylist(url);
        let videos = await playlist.getVideos();

        for (const vid of Object.values(videos)) {
            let video = await bot.youtube.getVideoByID(vid.id)
            await bot.handleVideo(video, message, VC, true)
        }

        return message.channel.send(`🎵 **${playlist.title}** has been added to queue.`);
    } else {

        try {
            var video = await bot.youtube.getVideo(url);
        } catch (err) {
            if (err) undefined;
            try {
                var vid = await bot.youtube.searchVideos(searchString, 1);
                var video = await bot.youtube.getVideoByID(vid[0].id);
            } catch (err) {
                console.error(err);
                return [message.delete(), utils.timed_msg(utils.cmd_fail(`${message.author}, no videos can be found with the argument \`${searchString}\``, `${config.prefix}play <music/url>`), 5000)];
            }
        }
        return bot.handleVideo(video, message, VC);
    }
};
    // // is the user connected?
    // if (!message.member.voiceChannel) return message.channel.send(":no_entry_sign: **You are not connected to a voice channel**")

    // // am i connected to another channel?
    // if (message.guild.me.voiceChannel) return message.channel.send(":no_entry_sign: **I am already in a channel**")

    // // check if user inputted a url
    // if (!args[0]) return message.channel.send(":no_entry_sign: **Please enter a url**")

    // // validate url
    // let validate = await ytdl.validateURL(args[0]);

    // // check validation
    // if (!validate) return message.channel.send(":no_entry_sign: **Please enter a valid URL**")

    // // fetch video info
    // let info = await ytdl.getInfo(args[0]);

    // // store the voice channel
    // let connection = await message.member.voiceChannel.join();

    // // play song
    // let dispatcher = await connection.playStream(ytdl(args[0], {filter: "audioonly"}));

    // // now playing
    // message.channel.send(`Now playing: ${info.title}`);

module.exports.help = {
    name: "play"
}