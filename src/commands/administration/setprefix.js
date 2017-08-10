/*jshint esversion:6*/

const commando = require('discord.js-commando');
const PersistentCollection = require("djs-collection-persistent");
const guildSettings = require('../../guildConfig.js');

class Set_Prefix extends commando.Command {
    constructor(client) {
      super(client, {
        name: 'setprefix',
        group: 'administration',
        memberName: 'setprefix',
        description: 'Set prefix for commands for your guild.'
      });
    }

    async run(message, args) {
      console.log(guildSettings);
      console.log(message.guild.id);
      console.log(guildSettings.get(message.guild.id));
      //const guildConf = guildSettings.get(message.guild.id);
      //console.log(guildConf);
      //guildConf.set('prefix', args);
      message.reply("Prefix has been changed!");
      console.log(args);
    }
  }

    module.exports = Set_Prefix;
