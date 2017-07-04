/*jshint esversion:6*/
const ytdl = require('ytdl-core');
const commando = require('discord.js-commando');
const request = require('request');

module.exports = {
  makePlaylist: function() {
    this.playlist = [];
    this.playing = false;
    this.voiceChannel = "";

    this.startPlaying = function() {
      this.voiceChannel = message.member.voiceChannel;
      if (!voiceChannel) {
        return message.reply('You are not in a voice channel.');
      } else {
        this.playing = true;
        voiceChannel.join();
      }
    }
    this.stopPlaying = function() {
      this.voiceChannel = message.member.voiceChannel;
      if (!this.playing) {
        return message.reply('No music is being played!');
      } else {
        this.playing = false;
        voiceChannel.leave();
      }
    }
    this.playSong = function(videoId) {
      connection = this.voiceChannel.connection;
      var stream = ytdl("https://www.youtube.com/watch?v=" + videoId, {
        filter: 'audioonly'
      });
      const dispatcher = connection.playStream(stream);
      dispatcher.on('end', function() {
        this.skip();
        if (playlist.length > 0) {
          this.playSong(playlist[0]);
        } else {
          this.stopPlaying();
        }
      });
    }

    this.addSong = function(song) {
      playlist.push(song);
    }
    this.skip = function() {
      playlist.shift();
    }
  }
}
