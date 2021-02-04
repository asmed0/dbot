const Command = require("../base/Command.js");
const { version, MessageReaction, ReactionCollector } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

//helper functions
function addTimer(date, timer) {
  return new Date(date.getTime() + timer);
}

function randomNumber(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}


class Giveaway extends Command {
  constructor(client) {
    super(client, {
      name: "giveaway",
      description: "Run a giveaway",
      usage: "!giveaway",
      category: "commands"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars

    let timerMilliseconds;
    let endTime = new Date();
    if (args[0].includes("m")) {
      timerMilliseconds = args[0].replace(/\D/g, "") * 60000;
      endTime = addTimer(endTime, timerMilliseconds)
    } else if (args[0].includes("s")) {
      timerMilliseconds = args[0].replace(/\D/g, "") * 1000;
      endTime = addTimer(endTime, timerMilliseconds)
    } else {
      throw error;
    }
    let msg = await message.channel.send(
      "**🥳GIVEAWAY🥳**",
      {
        embed: {
          title: `${(args.slice(2, args.length)).join(" ")}`,
          color: 3447003,
          description: `React with 🎉 to enter!\nTime to enter: ${args[0]}\nWinners: ${args[1]}`,
          footer: {
            text: `dbot 2021 © giveaway ends ${endTime.toLocaleTimeString()}`
          }
        }
      });
      await msg.react('🎉')
      setTimeout(() => {
          msg.reactions.cache.get('🎉').users.remove(msg.author.id)
          setTimeout(() => {
              let winner = msg.reactions.cache.get('🎉').users.cache.random();
              if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                msg.channel.send(`No one entered giveaway :sadge:`);
              }
              if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                console.log(msg.reactions.cache.get('🎉').users.cache.random());
                msg.channel.send(`${winner} is our winner!🎉🎉🎉`);
              }
          }, 3000);
      }, timerMilliseconds);
  }
}

module.exports = Giveaway;
