/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class Teamranking extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'teamranking',
      group: 'csgo',
      memberName: 'teamranking',
      description: 'Get team rankings from hltv'
    });
  }

  async run(message, args) {
    HLTV.getTeamRanking().then((res) => {
      var amount = 10;
      var info = "";
      for (var i = 0; i < amount; i++) {
        var team = res[i];
        var teamName = team.team.name;
        var points = team.points;
        var place = team.place;
        var change = team.change;
        if (change > 0) {
          change = "+" + change;
        }
        var temp = "\n#" + place + " " + teamName +
                    "\n" + "Change: " + change + "\t" + "Points: " + points +"\n";
        info = info + temp;
      }
      var teams = "```Markdown" + "\n" + info +" \n```";
      message.channel.send(teams);
    })
  }
}

module.exports = Teamranking;
