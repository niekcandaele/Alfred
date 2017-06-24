/*jshint esversion:6*/

const commando = require('discord.js-commando');

class RandomFact extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'fact',
      group: 'web',
      memberName: 'fact',
      description: 'Gives a random fact.'
    });
  }

  async run(message, args) {
    var request = require('request');
    var xml2js = require('xml2js');

    request("http://www.fayd.org/api/fact.xml", function(error, response, body) {
      if (error || response.statusCode === 420) {
        console.log("Error randomfact.js: ", error);
      }
      if (!error && response.statusCode === 200) {
        xml2js.parseString(body, function(error, result) {
          if (error) {
            console.error(error);
          }
          try {
            message.channel.send(result.facts.fact[0]);
          } catch (e) {
            message.reply("Unconventional response from API.");
          }
        })
      }
    })
  }
}

module.exports = RandomFact;
