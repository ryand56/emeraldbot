const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    function doMagic8ballVoodoo() {
        var rand = ['Yes', 'No', 'Most likely', 'Not likely', 'Maybe', 'Never', 'Yep'];

        return rand[Math.floor(Math.random()*rand.length)];
    }

    message.channel.send('Your answer is: ' + doMagic8ballVoodoo());
}

module.exports.help = {
    name: "8ball"
}