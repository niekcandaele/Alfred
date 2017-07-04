
const commando = require('discord.js-commando');


class Stop extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      description: 'Stop music playback.'
    });
  }

  async run(message, args) {
    Playlist.stopPlaying();
  }
}

module.exports = Stop;
