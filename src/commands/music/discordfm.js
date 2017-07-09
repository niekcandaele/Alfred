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
    const client = this.client;
    var playing;
    var dispatcher;
    var voiceChannel = message.member.voiceChannel;
    var channels = new Map();

    if (args == "") {
      message.reply("*** put help message here ***!");
      return;
    }
    if (args == "stop") {
      try {
        playing = false;
        voiceChannel.leave();
        return message.reply("Stopping playback!");
      } catch (e) {
        console.log("Error d.fm : " + e);
      }

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
    }
    if (!isNaN(args)) {
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
      if (voiceChannel.connection.dispatcher != null) {
        if (voiceChannel.connection.dispatcher.time > 0) {
          voiceChannel.connection.dispatcher.end();
        }
      }
      var station = channels.get(parseInt(args, 10));
      request(station, function(error, response, body) {
        var videos = JSON.parse(body);
        if (error) {
          console.log("Error discordfm.js: " + error);
          message.reply("Error! Wrong arguments?");
        }

        var amountOfSongs = videos.length;

        function getRandomSong() {
          var randomNumber = Math.floor(Math.random() * amountOfSongs);
          return randomNumber;
        }

        function playSong(videoId) {
          console.log("DFM - Now playing : " + videos[videoId].title);
          playing = true;
          var stream = ytdl("https://www.youtube.com/watch?v=" + videos[videoId].identifier, {
            filter: 'audioonly'
          });
          var dispatcher = voiceChannel.connection.playStream(stream);
          var spamChannelID = "283272868291411968";
          client.user.setGame(videos[videoId].title);
          client.channels.get(spamChannelID).send('Now playing: ' + videos[videoId].title);
          //message.channel.send('Now playing: ' + videos[videoId].title);
          dispatcher.on('end', function() {
            if (dispatcher.time / 100 >= videos[videoId].length) {
              //console.log("Dispatcher time: " + dispatcher.time);
              //console.log("Video length: " + videos[videoId].length);
              var randomN = getRandomSong();
              if (videos[randomN].service == "YouTubeVideo") {
                playSong(randomN);
              }
            }
          })
        }
        playSong(getRandomSong());
      });
    }
  }
}


module.exports = DiscordFM;
