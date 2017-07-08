/*jshint esversion:6*/
const fs = require('fs');
const Commando = require('discord.js-commando');


// read config file
fs.readFile('config.json', 'utf8', function(err, data) {
  if (err) {
    console.log("Error: config failed to load!");
    return console.log(err);
  }
  data = JSON.parse(data);
  var owner = data.owner;
  var token = data.token;
  var ytApiKey = data.ytapi;

  const bot = new Commando.Client({
    owner: owner
  });

  bot.registry.registerDefaults();
  bot.registry.registerGroup("random", "Random");
  bot.registry.registerGroup("music", "Music");
  bot.registry.registerGroup("web", "Web");
  bot.registry.registerGroup("csgo", "CSGO");
  bot.registry.registerGroup("roles", "Roles");
  bot.registry.registerCommandsIn(__dirname + '/commands');

  bot.on('guildMemberAdd', member => {
    member.createDM().then(function(value) {
      value.send(`Welcome to Catalysm's chillspot, ${member}! \n` +
                  "To see the game channels, set your role(s) using the relevant commands \n" +
                  "!csgo, !pubg, !eso \n" +
                  "type !help to see what I can do for you!");
    }, function(reason) {
      console.log("rejected: " + reason);
    });

    //
  });




  bot.login(token);
  console.log("Alfred is at your service, sir.");
});
