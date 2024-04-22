const { Events } = require("discord.js");
const errorEmbed = require("../../components/embeds/error.js");
const logger = require("../../util/logger.js");

module.exports = {
  name: Events.GuildMemberRemove,
  once: false,

  async execute(member, client, interaction) {
    try {
      function updateMemberCount(guild) {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get("1055031532701622332");

        if (channel) {
          channel.setName(`server members: ${memberCount}`);
        } else {
          console.error("Channel not found.");
        }
      }
      updateMemberCount(member.guild);
    } catch (error) {
      logger.error(error);
      const errEmbed = errorEmbed(client, interaction, error);
      channel.send({ embeds: [errEmbed] });
    }
  },
};
