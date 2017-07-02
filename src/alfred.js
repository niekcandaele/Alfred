
/*jshint esversion:6*/
const fs = require('fs');
const Commando = require('discord.js-commando');
const bot = new Commando.Client({
  owner: owner
});

var owner = "";
var token = "";

// read config file
fs.readFile('config.json', 'utf8', function(err, data) {
  if (err) {
    console.log("Error: config failed to load!");
    return console.log(err);
  }
  data = JSON.parse(data);
  owner = data.owner;
  token = data.token;

  bot.registry.registerDefaults();
  bot.registry.registerGroup("random", "Random");
  bot.registry.registerGroup("music", "Music");
  bot.registry.registerGroup("web", "Web");
  bot.registry.registerCommandsIn(__dirname + '/commands');

  bot.login(token);
  console.log("Alfred is at your service, sir.");
});
