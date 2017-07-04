
const commando = require('discord.js-commando');


class Skip extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      description: 'Skip a song.'
    });
  }
  async run(message, args) {
    Playlist.skip();
  }
}

module.exports = Skip;
