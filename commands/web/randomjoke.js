/*jshint esversion:6*/

const commando = require('discord.js-commando');

class RandomJoke extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'joke',
      group: 'web',
      memberName: 'joke',
      description: 'Gives a random Chuck Norris joke.'
    });
  }

  async run(message, args) {
    var request = require('request');
    let url = "http://api.icndb.com/jokes/random?escape=javascript"

    request(url, function(error, response, body) {
      var json = JSON.parse(body);
      if (error) {
        console.log("Error randomjoke.js: ", error);
      }
      if (!error && response.statusCode === 200) {
        try {
          message.channel.send(json.value.joke);
        } catch (e) {
          message.reply("Unconventional response from API.")
        }
      }
    })
  }
}

module.exports = RandomJoke;
