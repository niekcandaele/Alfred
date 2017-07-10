/*jshint esversion:6*/
const commando = require('discord.js-commando');
const request = require('request');

class Userinfo extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      group: 'administration',
      memberName: 'userinfo',
      description: 'Show detailed information about a discord user.'
    });
  }

  async run(message, args) {
    var client = this.client;
    var Id = args.slice(2,(args.length - 1));
    var guild = client.guilds.get("220555874568110080");
    var guildMember = guild.members.get(Id);
    var user = client.users.get(Id);
    var userGame
    var date = new Date();

    var roles = guildMember.roles;
    var rolesAll = "";

    for (let value of roles) {
      rolesAll += value[1].name + ", ";
    }


    if (user.presence.game == null) {
      userGame = "Not playing anything";
    } else {
      userGame = user.presence.game.name;
    }

    var embed = {
        "content": "Userinfo",
        "embed": {
          "title": "Userinfo ",
          "url": "https://discordapp.com",
          "color": 15312430,
          "timestamp": date,
          "footer": {
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
            "text": "Alfred"
          },
          "thumbnail": {
              "url": user.displayAvatarURL
          },
          "author": {
            "name": user.username,
            "url": "https://discordapp.com",
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "fields": [
            {
              "name": "STATUS",
              "value": user.presence.status,
              "inline": true
            },
            {
              "name": "GAME",
              "value": userGame,
              "inline": true
            },
            {
              "name": "Roles",
              "value": rolesAll
            },
            {
              "name": "Joined discord on",
              "value": user.createdAt.toDateString(),
              "inline": true
            },
            {
              "name": "Joined this server on",
              "value": guildMember.joinedAt.toDateString(),
              "inline": true
            },
          ]
        }
      }
      message.channel.send(embed);
    }
  }

module.exports = Userinfo;
