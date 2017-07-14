/*jshint esversion:6*/

const commando = require('discord.js-commando');

class Role_got extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_got',
      aliases: ['got'],
      group: 'administration',
      memberName: 'role_got',
      description: 'Sets a users role to got. Allows you to see the got text channel.'
    });
  }

  async run(message, args) {
    var roleID = "335387038809325568"; // role ID is different for every server!
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

module.exports = Role_got;
