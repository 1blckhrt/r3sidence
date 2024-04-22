const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  GuildMember,
} = require("discord.js");
const ms = require("ms");
const logger = require("../../util/logger.js");
const errorEmbed = require("../../components/embeds/error.js");

module.exports = {
  developer: true,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit an event.")
    .setDMPermission(false),
  async execute(interaction, client) {
    if (interaction.user.id !== "800222752572702731") {
      const embed = new EmbedBuilder()
        .setTitle(":x: Unauthorized")
        .setDescription(
          "You are not authorized to use this command. This command is only for the bot developer."
        )
        .setColor("Red")
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    try {
      const guild = client.guilds.cache.get("945053447504425021");
      const member = new GuildMember(
        client,
        { user: { id: "800222752572702731" } },
        guild
      );

      client.emit("guildMemberAdd", member);

      const embed = new EmbedBuilder()
        .setTitle(":white_check_mark: Event Emitted")
        .setDescription(`Successfully emitted the event "guildMemberAdd".`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      logger.error(error);
      const errEmbed = errorEmbed(client, interaction, error);
      await interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
