/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Role_CSGO extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_csgo',
      aliases: ['csgo'],
      group: 'roles',
      memberName: 'role_csgo',
      description: 'Sets a users role to csgo'
    });
  }

  async run(message, args) {
    message.member.addRole("254954812603498498");
    message.reply("Your role has been set!")
  }
}

module.exports = Role_CSGO;
