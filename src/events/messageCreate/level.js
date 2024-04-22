const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    const level5 = "1054991162492080169";
    const level15 = "1055036193303183370";
    const level20 = "1062049756689481858";
    const level30 = "1140844190465544295";
    const level50 = "1140076225348522084";
    const level5String = "you just advanced to level 5!";
    const level15String = "you just advanced to level 15!";
    const level20String = "you just advanced to level 20!";
    const level30String = "you just advanced to level 30!";
    const level50String = "you just advanced to level 50!";

    if (
      message.author.id === "800222752572702731" &&
      message.content.includes("you just advanced to level")
    ) {
      const mentionedUser = message.mentions.members.first();

      if (mentionedUser) {
        try {
          const content = message.content;
          switch (true) {
            case content.endsWith(level5String) &&
              !mentionedUser.roles.cache.has(level5):
              mentionedUser.roles.add(level5);
              break;
            case content.endsWith(level15String) &&
              !mentionedUser.roles.cache.has(level15):
              mentionedUser.roles.add(level15);
              break;
            case content.endsWith(level20String) &&
              !mentionedUser.roles.cache.has(level20):
              mentionedUser.roles.add(level20);
              break;
            case content.endsWith(level30String) &&
              !mentionedUser.roles.cache.has(level30):
              mentionedUser.roles.add(level30);
              break;
            case content.endsWith(level50String) &&
              !mentionedUser.roles.cache.has(level50):
              mentionedUser.roles.add(level50);
              break;
            default:
              break;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
};
