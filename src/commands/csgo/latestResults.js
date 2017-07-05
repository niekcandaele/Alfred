/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class LatestResults extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'results',
      group: 'csgo',
      memberName: 'results',
      description: 'Get the latest results from hltv.org.'
    });
  }

  async run(message, args) {
    HLTV.getLatestResults({pages: 3}).then((res) => {
      var amountMatches // how many matches to display
      var info = "" // Info to be shown, will be assembled later in command.
      amountMatches = 5;
      for (var i = 0 ; i < amountMatches; i++) {
        var game = res[i]; //select a game
        var team1 = game.team1;
        var team2 = game.team2;
        var result = game.result;
        var tournament = game.event.name;
        var format = game.format;
        var temp = "\n#" + team1 + "\t vs \t" + team2 + "\n" +
                    tournament + "\t" + format + "\n" +
                    result + "\n";
        info = info + temp;
      }
      var matches = "```Markdown" + "\n" + info +" \n```";
      message.channel.send(matches);
  })

  }
}

module.exports = LatestResults;
