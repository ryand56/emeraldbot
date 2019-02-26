const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
            message.channel.send(":no_entry_sign: **Please enter a valid location.**")
            return;
        }

        // Variables
        var current = result[0].current;
        var location = result[0].location;

        // embed
        let embed = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor("#00ae86")
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Degree Type", location.degreeType, true)
        .addField("Temperature", `${current.temperature} degrees`, true)
        .addField("Feels Like", `${current.feelslike} degrees`, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true)

        // send embed
        message.channel.send({embed});
    })
}

module.exports.help = {
    name: "weather"
}