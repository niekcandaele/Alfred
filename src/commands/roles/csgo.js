/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Role_CSGO extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'csgo',
      aliases: ['csgo'],
      group: 'roles',
      memberName: 'role_csgo',
      description: 'Sets a users role to csgo. Allows you to see the CSGO text channel.'
    });
  }

  async run(message, args) {
    var roleID = "254954812603498498"; // role ID is different for every server!
    var myMap = message.member.roles;
    var isRemoved = false;
    for (var [key, value] of myMap) {
      if (key === roleID) {
        message.member.removeRole(roleID);
        message.reply("Your role has been removed!");
        isRemoved = true;
      }
    }
    if (!isRemoved) {
      message.member.addRole(roleID);
      message.reply("Your role has been set!")
    }
  }
}

module.exports = Role_CSGO;
