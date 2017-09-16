/*jshint esversion:6*/
const Commando = require('discord.js-commando');
const PersistentCollection = require("djs-collection-persistent");
const guildSettings = require('./guildConfig.js');
const fs = require("fs");


var owner
var token

// read config file
fs.readFile('config.json', 'utf8', function(err, data) {
  if (err) {
    console.log("Error: config failed to load!");
    return console.log(err);
  }
  data = JSON.parse(data);
  owner = data.owner;
  token = data.token;
  bot.login(token);
});

function registerCmds() {
  bot.registry.registerDefaults();
  bot.registry.registerGroup("music", "Music");
  bot.registry.registerGroup("web", "Web");
  bot.registry.registerGroup("csgo", "CSGO");
  bot.registry.registerGroup("administration", "Administration");
  bot.registry.registerCommandsIn(__dirname + '/commands');
}

const defaultSettings = {
  prefix: "$",
  musicVolume: 1
}
const bot = new Commando.Client({
  owner: owner
});

bot.commandPrefix = defaultSettings.prefix;

bot.on("guildCreate", guild => {
  guildSettings.set(guild.id, defaultSettings);
});
bot.on("guildDelete", guild => {
  guildSettings.delete(guild.id);
});

bot.on("ready", () => {
  registerCmds();
  console.log("Alfred is at your service, sir.");
});
