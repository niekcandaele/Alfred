/*jshint esversion:6*/
const ytdl = require('ytdl-core');
const commando = require('discord.js-commando');

class Play extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Play something from youtube.'
    });
  }

  async run(message, args) {
    var voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) {
      return message.reply('You are not in a voice channel.');
    }
    voiceChannel.join()
      .then(connection => {
        const stream = ytdl("https://www.youtube.com/watch?v=UROLAsyc_KU", {
          filter: 'audioonly'
        });
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
      })
  }
}


module.exports = Play;
