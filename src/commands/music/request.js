const ytdl = require('ytdl-core');
const commando = require('discord.js-commando');
const request = require('request');


class Request extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'request',
      group: 'music',
      memberName: 'request',
      description: 'Request a song from youtube.'
    });
  }

  async run(message, args) {
    if (!Playlist.playing) {
      Playlist.startPlaying();
    }
    var url = "https://www.googleapis.com/youtube/v3/search?q=" + args + "&maxResults=5&part=snippet&key=" + ytApiKey;
    request(url, function(error, response, body) {
      var json = JSON.parse(body);
      if (error) {
        console.log("Error play.js: ", error);
      }
      var videoId = json.items[0].id.videoId;
      console.log("videoId: ", videoId);
      Playlist.addSong(videoId);
    })
  }
}

module.exports = Request;
