/*jshint esversion:6*/
const commando = require('discord.js-commando');
    const request = require('request');
    const xml2js = require('xml2js')

class Rule34 extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'rule34',
      group: 'web',
      memberName: 'rule34',
      description: 'Look up something on rule34.xxx'
    });
  }

  async run(message, args) {
    let url = "http://www.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=" + args;
    request(url, function(error, response, body) {
      if (error) {
        console.log("Error rule34.js: ", error);
      }
      xml2js.parseString(body, function(error, result) {
        if (error) {
          console.log("Error rule34.js: ", error);
        }
        try {
          var amountOfPosts = result.posts.post.length;
          var randomPost = Math.floor(Math.random() * amountOfPosts);
          var imageLink = "http://www" + result.posts.post[randomPost].$.file_url.substr(5);
          message.channel.send(imageLink);
      //    Logger(message.channel.user.username, message.guild, message + args);
        } catch (e) {
          message.reply("Unconventional response from API! (no results?)")
        }
      })
    })

  }
}

module.exports = Rule34;
