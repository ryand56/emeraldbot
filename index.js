const config = require("./botconfig.json");
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const utils = require("./global/utils");
const fs = require("fs");
const {YouTubeAPIKey} = require("./credentials.json")
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.youtube = new YouTube(YouTubeAPIKey);
bot.queue = new Map();
bot.votes = new Map();

require("./global/functions")(bot, utils, ytdl, config);

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
})

//const activities_list = ["test", "commands! | e!help", "2019 | e!help", "elementemerald.tk",]; // creates an arraylist containing phrases you want your bot to switch through.

//bot.on('ready', () => {
  //console.log(`${bot.user.username} is online!`)
  //setInterval(async () => {
      //const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
      //await bot.user.setActivity(activities_list[index], {url: "https://twitch.tv/#"}, {type: "STREAMING",}); // sets bot's activities to one of the phrases in the arraylist.
  //}, 10000); // Runs this every 10 seconds.
//});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  // bot.user.setActivity(`with js! | ebd.help`, {type: "PLAYING",});
  // bot.user.setStatus('online')
  var status = [
    `${bot.guilds.array().length} server${bot.guilds.array().length > 1 ? 's' : ''} | ebd.help`,
    `${bot.channels.array().length} channel${bot.channels.array().length > 1 ? 's' : ''} | ebd.help`,
    `${bot.users.array().length} user${bot.users.array().length > 1 ? 's' : ''} | ebd.help`,
    `with code | ebd.help`,
    `commands | ebd.help`,
  ];

  var types = [
    `LISTENING`,
    `LISTENING`,
    `LISTENING`,
    `PLAYING`,
    `LISTENING`,
  ];

  gameval = 0;
  setInterval(() => {
    if (gameval == status.length) { gameval = 0; }
		bot.user.setActivity(`${status[gameval]}`, { type: types[gameval], url: "https://www.twitch.tv/twitch" });
		gameval++;
  }, 16000);

  //bot.user.setGame("on SourceCade!");
  //{url: "https://twitch.tv/#"}
});

bot.on("message", async message => {
  if(!message.content.startsWith(config.prefix))return;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  // if(cmd === `${prefix}kick`){

  //   //!kick @daeshan askin for it

  //   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!kUser) return message.channel.send("Can't find user!");
  //   let kReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  //   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  //   let kickEmbed = new Discord.RichEmbed()
  //   .setDescription("~Kick~")
  //   .setColor("#e56b00")
  //   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  //   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Kicked In", message.channel)
  //   .addField("Tiime", message.createdAt)
  //   .addField("Reason", kReason);

  //   let kickChannel = message.guild.channels.find(`name`, "incidents");
  //   if(!kickChannel) return message.channel.send("Can't find incidents channel.");

  //   message.guild.member(kUser).kick(kReason);
  //   kickChannel.send(kickEmbed);

  //   return;
  // }

  // if(cmd === `${prefix}ban`){

  //   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!bUser) return message.channel.send("Can't find user!");
  //   let bReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  //   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  //   let banEmbed = new Discord.RichEmbed()
  //   .setDescription("~Ban~")
  //   .setColor("#bc0000")
  //   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  //   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Banned In", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", bReason);

  //   let incidentchannel = message.guild.channels.find(`name`, "incidents");
  //   if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

  //   message.guild.member(bUser).ban(bReason);
  //   incidentchannel.send(banEmbed);


  //   return;
  // }


  // if(cmd === `${prefix}report`){

  //   //!report @ned this is the reason

  //   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!rUser) return message.channel.send("Couldn't find user.");
  //   let rreason = args.join(" ").slice(22);

  //   let reportEmbed = new Discord.RichEmbed()
  //   .setDescription("Reports")
  //   .setColor("#15f153")
  //   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  //   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //   .addField("Channel", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", rreason);

  //   let reportschannel = message.guild.channels.find(`name`, "reports");
  //   if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


  //   message.delete().catch(O_o=>{});
  //   reportschannel.send(reportEmbed);

  //   return;
  // }




  // if(cmd === `${prefix}serverinfo`){

  //   let sicon = message.guild.iconURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Server Information")
  //   .setColor("#15f153")
  //   .setThumbnail(sicon)
  //   .addField("Server Name", message.guild.name)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.member.joinedAt)
  //   .addField("Total Members", message.guild.memberCount);

  //   return message.channel.send(serverembed);
  // }



  // if(cmd === `${prefix}botinfo`){

  //   let bicon = bot.user.displayAvatarURL;
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Bot Information")
  //   .setColor("#15f153")
  //   .setThumbnail(bicon)
  //   .addField("Bot Name", bot.user.username)
  //   .addField("Created On", bot.user.createdAt);

  //   return message.channel.send(botembed);
  // }

});

//bot.on("guildCreate", (message, guild) => {
  //let embed = new Discord.RichEmbed()
  //.setColor("#2c75ea")
  //.setDescription("Joined a new server: " + guild.name)
  //.setAuthor(bot.user.username, bot.user.displayAvatarURL)
  //.setFooter(`ID-${message.createdTimestamp}`)
  //.setTimestamp()
  
  //bot.channels.get("539625984652214286").send(embed)
//})

// bot.on('guildMemberAdd', (message) => {
//   let guild = bot.guilds.get('264445053596991498')
//   let channel = bot.channels.get('265156361791209475')
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Member has joined.")
//   .setDescription(`Welcome, ` + member.user)
//   .setColor("#00ff00")
//   .setFooter(`ID-${member.user.id} | ${guild.memberCount} members`)

//   channel.send(embed)
// })

// bot.on('guildMemberRemove', (message) => {
//   let guild = bot.guilds.get('264445053596991498')
//   let channel = bot.channels.get('265156361791209475')
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Member has left.")
//   .setDescription(`Goodbye, ` + member.user)
//   .setColor("#ff0000")
//   .setFooter(`ID-${member.user.id} | ${guild.memberCount} members`)

//   channel.send(embed)
// })

//bot.on('messageUpdate', (oldMessage, newMessage) => {
    //let embed = new Discord.RichEmbed()

    //.setAuthor("Message updated.")
//})

// bot.on('messageDelete', (message) => {
//   let guild = bot.guilds.get("264445053596991498")
//   let channel = bot.channels.get("265156361791209475")
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setTitle(`A message was deleted from ${message.channel}`)
//   .addField("User: ", `${message.author}`)
//   .addField("Message: ", `${message.content}`)
//   .setColor("#ffae00")
//   .setFooter(`ID-${member.id}`)

//   channel.send(embed)
// })

// old member update
// bot.on('guildMemberUpdate', (oldMember, newMember) => {
//   // let guild = bot.guilds.get("264445053596991498")
//   let channel = bot.channels.get("265156361791209475")
//   let embed = new Discord.RichEmbed()

//   .setTitle("User updated")
//   .addField("Before: ", `${oldMember.displayName}`, true)
//   .addField("After: ", `${newMember.displayName}`, true)
//   .setColor("#0000ff")
//   .setFooter(`ID-${newMember.id}`)

//   channel.send(embed)
// })
// bot.on('guildMemberUpdate', (oldMember, newMember) => {
//   let channel = bot.channels.get("544731185092231169");
//   let embed = new Discord.RichEmbed()

//       .setAuthor("Member updated")
//       .setDescription(`Member: ${newMember.user}`)
//       .addField(`Before: `, oldMember.displayName, true)
//       .addField(`After: `, newMember.displayName, true)
//       .addField(`Roles before: `, oldMember.roles.map(role => role.name).join(", "))
//       .addField(`Roles after: `, newMember.roles.map(role => role.name).join(", "))
//       .addField(`Guild ID: `, newMember.guild.id, true)
//       .setColor("#1affa0")
//       .setFooter(`ID-${newMember.id}`)
//       .setTimestamp();

//   channel.send(embed)
// });

// bot.on('messageUpdate', (oldMessage, newMessage, message) => {
//   let guild = bot.guilds.get("288448406806986752")
//   let channel = bot.channels.get("539625984652214286")
//   let member = message
//   let embed = new Discord.RichEmbed()

//   .setAuthor("Message updated")
//   .addField("Before", oldMessage, true)
//   .addField("After", newMessage, true)
//   .setColor("#0000ff")
//   .setFooter(`ID-${member.id} | Canary v1.0.1`)

//   channel.send(embed)
// })
bot.on('guildCreate', (guild) => {
  let channel = bot.channels.get("546473513590980608")
  let embed = new Discord.RichEmbed()

  .setAuthor("I have joined a new server")
  .setDescription(`Guild: `, guild.name)
  .setColor("#00ff00")
  .addField("Guild ID: ", guild.id)
  .setFooter(`ID-${bot.user.id}`)
  .setTimestamp()

  channel.send(embed)
})

bot.on('guildDelete', (guild) => {
  let channel = bot.channels.get("546473513590980608")
  let embed = new Discord.RichEmbed()

  .setAuthor("I have left a server")
  .setDescription(`Guild: `, guild.name)
  .setColor("#ff0000")
  .addField("Guild ID: ", guild.id)
  .setFooter(`ID-${bot.user.id}`)
  .setTimestamp()

  channel.send(embed)
})

bot.login(config.token);