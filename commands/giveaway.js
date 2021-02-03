const Command = require("../base/Command.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

class Giveaway extends Command {
  constructor (client) {
    super(client, {
      name: "giveaway",
      description: "Run a giveaway",
      usage: "!giveaway",
      category: "commands"
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    let endTime = new Date(new Date() + args[0]*60);
    message.channel.send(
      "**🥳GIVEAWAY🥳**",
      {embed: {
      title: `${(args.slice(2,args.length)).join(" ")}`,
      color: 3447003,
      description: `React with 🎉 to enter!\nTime remaining: ${args[0]}m\nWinners: ${args[1]}`,
      footer: {
        text: `dbot 2021 © giveaway ends ${endTime.toLocaleTimeString()}`
      }
    }});
  }
}

module.exports = Giveaway;
