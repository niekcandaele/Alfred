/*jshint esversion:6*/

const commando = require('discord.js-commando');

class UrbanDictionary extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'urbandictionary',
      aliases: ['ud'],
      group: 'web',
      memberName: 'urbandictionary',
      description: 'Defines a word'
    });
  }

  async run(message, args) {
    var request = require('request');
    var url = "http://api.urbandictionary.com/v0/define?term=" + args;
    request(url, function(error, response, body) {
      var json = JSON.parse(body);
      if (error) {
        console.log("Error urbandictionary.js: ", error);
      } else {
        try {
          message.channel.send(
            "Definition: " +
            json.list[0].definition +
            "\n\nExample: " +
            json.list[0].example
            );
        } catch (e) {
          message.reply("Unconventional response from API. (Word not found?)")
        }
      }
    })
  }
}


module.exports = UrbanDictionary;
