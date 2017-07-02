/*jshint esversion:6*/
var ffmpeg = require('ffmpeg');
const commando = require('discord.js-commando');

class Join extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'music',
      memberName: 'join',
      description: 'Join a voice channel'
    });
  }

  async run(message, args) {
   if (message.member.voiceChannel) {
     message.member.voiceChannel.join()
       .then(connection => {
         message.reply('I have successfully connected to the channel!');
       })
       .catch(console.log);
   } else {
     message.reply('You need to join a voice channel first!');
   }
 }

}

module.exports = Join;
