/*jshint esversion:6*/

const commando = require('discord.js-commando');
const request = require('request');
const HLTV = require('hltv');

class CsgoStreams extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'streams',
      group: 'csgo',
      memberName: 'streams',
      description: 'Get streams on the frontpage of hltv'
    });
  }

  async run(message, args) {
    HLTV.getStreams({loadLinks:true}).then((res) => {
      var amount = 5;
      var info = "";
      for (var i = 0; i < amount; i++) {
        var stream = res[i];
        var name = stream.name;
        var cat = stream.category;
        var lang = stream.country.code;
        var link = stream.realLink;
        var viewers = stream.viewers;
        var temp = "\n#" + name + "\n" +
                    cat + "\t" + lang + "\t" + viewers + "\n" +
                    link + "\n";
        info = info + temp;
      }
      var streams = "```Markdown" + "\n" + info +" \n```";
      message.channel.send(streams);
    })
  }
}

module.exports = CsgoStreams;
