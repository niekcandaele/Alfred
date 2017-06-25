/*jshint esversion:6*/

const Commando = require('discord.js-commando');
const bot = new Commando.Client({
  owner: '324843053921861634'
});

bot.registry.registerDefaults();
bot.registry.registerGroup("random" , "Random");
bot.registry.registerGroup("music", "Music");
bot.registry.registerGroup("web", "Web");
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login('***');

console.log("Alfred is at your service, sir.");
