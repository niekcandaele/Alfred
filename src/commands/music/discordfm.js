/*jshint esversion:6*/
const ytdl = require('ytdl-core');
const commando = require('discord.js-commando');
const request = require('request');

class DiscordFM extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'discordfm',
      aliases: ['dfm'],
      group: 'music',
      memberName: 'discordfm',
      description: 'Play something from discord.fm.'
    });
  }

  async run(message, args) {
    console.log("Args: " + args);
    var voiceChannel = message.member.voiceChannel;
    var channels = new Map();
    var playing = true;

    if (args == "") {
      message.reply("*** put help message here ***!");
      return;
    }
    if (args == "stop") {
      voiceChannel.connection.dispatcher.pause();
      voiceChannel.leave();
      playing = false;
      return;
    }
    if (args == "stations") {
      var stations = "```" + "\n" +
        "1. Electro hub, 2. Chill Corner, 3. Korean madness, 4. Japanese Lounge\n" +
        "5. Classical, 6. Retro Renegade, 7. Metal Mix, 8. Hip-hop\n" +
        "9. Electro Swing, 10. Purely pop, 11. Rock-n-Roll, 12. Coffee-house Jazz\n" +
        "Use \"!discordfm <number>\" to select a station to play\n" +
        "```";
      message.reply(stations);
      return;
    } else {

      function fillMap(map) {
        // No decent API, so let's hope these links don't break...
        channels.set(1, "https://temp.discord.fm/libraries/electro-hub/json");
        channels.set(2, "https://temp.discord.fm/libraries/chill-corner/json");
        channels.set(3, "https://temp.discord.fm/libraries/korean-madness/json");
        channels.set(4, "https://temp.discord.fm/libraries/japanese-lounge/json");
        channels.set(5, "https://temp.discord.fm/libraries/classical/json");
        channels.set(6, "https://temp.discord.fm/libraries/retro-renegade/json");
        channels.set(7, "https://temp.discord.fm/libraries/metal-mix/json");
        channels.set(8, "https://temp.discord.fm/libraries/hip-hop/json");
        channels.set(9, "https://temp.discord.fm/libraries/electro-swing/json");
        channels.set(10, "https://temp.discord.fm/libraries/purely-pop/json");
        channels.set(11, "https://temp.discord.fm/libraries/rock-n-roll/json");
        channels.set(12, "https://temp.discord.fm/libraries/coffee-house-jazz/json");
      }
      fillMap();

      if (!voiceChannel) {
        return message.reply('You are not in a voice channel.');
      } else {
        voiceChannel.join();
      }
      var station = channels.get(parseInt(args, 10));
      request(station, function(error, response, body) {
        var videos = JSON.parse(body);
        if (error) {
          console.log("Error discordfm.js: " + error);
          message.reply("Error! Wrong arguments?");
        }

        var amountOfSongs = videos.length;
        var connection = voiceChannel.connection;

        function getRandomSong() {
          var randomNumber = Math.floor(Math.random() * amountOfSongs);
          return randomNumber;
        }

        function playSong(videoId) {
          var stream = ytdl("https://www.youtube.com/watch?v=" + videos[videoId].identifier, {
            filter: 'audioonly'
          });
          //this.client.user.setGame(videos[videoId].title);
          var dispatcher = connection.playStream(stream);
          dispatcher.on('end', function() {
            if (playing) {
              playSong(getRandomSong());
            }
          })
        }
        playSong(getRandomSong());
      });
    }
  }
}


module.exports = DiscordFM;
