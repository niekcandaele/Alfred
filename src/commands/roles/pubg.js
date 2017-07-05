/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Role_pubg extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_pubg',
      aliases: ['pubg'],
      group: 'roles',
      memberName: 'role_pubg',
      description: 'Sets a users role to pubg'
    });
  }

  async run(message, args) {
    message.member.addRole("324826096224829440");
    message.reply("Your role has been set!")
  }
}

module.exports = Role_pubg;
