const { Events } = require("discord.js");
const errorEmbed = require("../../components/embeds/error.js");
const logger = require("../../util/logger.js");

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,

  async execute(member, client, interaction) {
    try {
      const channel = member.guild.channels.cache.get("945053887566590044");

      const message = `welcome to r3, <@${member.user.id}>!`;

      channel.send({ content: message });
    } catch (error) {
      logger.error(error);
      const errEmbed = errorEmbed(client, interaction, error);
      channel.send({ embeds: [errEmbed] });
    }
  },
};
