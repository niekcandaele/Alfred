/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Role_pubg extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_pubg',
      aliases: ['pubg'],
      group: 'administration',
      memberName: 'role_pubg',
      description: 'Sets a users role to pubg. Allows you to see the pubg text channel.'
    });
  }

  async run(message, args) {
    var roleID = "324826096224829440"; // role ID is different for every server!
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

module.exports = Role_pubg;
