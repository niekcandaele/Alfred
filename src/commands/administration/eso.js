/*jshint esversion:6*/
const commando = require('discord.js-commando');

class Role_eso extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'role_eso',
      aliases: ['eso'],
      group: 'administration',
      memberName: 'eso',
      description: 'Sets a users role to eso. Allows you to see the ESO text channel.'
    });
  }

  async run(message, args) {
    var roleID = "303149214387404800"; // role ID is different for every server!
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



module.exports = Role_eso;
