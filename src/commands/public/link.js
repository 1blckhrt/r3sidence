const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
const logger = require("../../util/logger.js");
const errorEmbed = require("../../components/embeds/error.js");

module.exports = {
  developer: false,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Displays the specified link.")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("The link you would like displayed.")
        .setRequired(true)
        .addChoices(
          { name: "Soundcloud", value: "https://soundcloud.com/r3sidence" },
          {
            name: "Instagram",
            value: "https://www.instagram.com/r3sidentiary/",
          },
          {
            name: "Spotify",
            value: "https://open.spotify.com/artist/4wPRsGzTVRFjPioh36gZA9",
          },
          { name: "Discord", value: "discord.gg/r3sidence" }
        )
    ),

  async execute(interaction, client) {
    try {
      const link = interaction.options.getString("link");
      const icon = `${client.user.displayAvatarURL()}`;
      const embed = new EmbedBuilder()
        .setTitle("Link Display")
        .setColor("DarkButNotBlack")
        .setDescription(`${interaction.user}, here is the link you specified:`)
        .setAuthor({ name: "r3sidence", iconURL: icon })
        .setTimestamp()
        .addFields({ name: "Link: ", value: `${link}` });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      logger.error(error);
      const errEmbed = errorEmbed(client, interaction, error);
      return await interaction.reply({ embeds: [errEmbed] });
    }
  },
};
