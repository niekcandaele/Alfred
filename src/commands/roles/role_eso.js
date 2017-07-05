/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Role_eso extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_eso',
      aliases: ['eso'],
      group: 'roles',
      memberName: 'role_eso',
      description: 'Sets a users role to eso'
    });
  }

  async run(message, args) {
    message.member.addRole("303149214387404800");
    message.reply("Your role has been set!")
  }
}

module.exports = Role_eso;
