const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Emoji,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const ms = require("ms");
const logger = require("../../util/logger.js");
const errorEmbed = require("../../components/embeds/error.js");

module.exports = {
  developer: false,
  cooldown: ms("5s"),
  data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("View information about the server."),
  async execute(interaction) {
    try {
      const { guild } = interaction;
      const { name, createdTimestamp, memberCount } = guild;
      const icon = guild.iconURL();
      const roles = guild.roles.cache.size;
      const emojis = guild.emojis.cache.size;
      const id = guild.id;

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Discord Server")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.gg/r3sidence"),

        new ButtonBuilder()
          .setLabel("SoundCloud Page")
          .setStyle(ButtonStyle.Link)
          .setURL("https://soundcloud.com/r3sidence"),

        new ButtonBuilder()
          .setLabel("Instagram Page")
          .setStyle(ButtonStyle.Link)
          .setURL("https://instagram.com/r3sidentiary")
      );

      const embed = new EmbedBuilder()
        .setTitle("Server Info")
        .setColor("DarkButNotBlack")
        .setThumbnail(icon)
        .setAuthor({ name: name, iconURL: icon })
        .setFooter({ text: `Server ID: ${id}` })
        .setTimestamp()
        .addFields({ name: "Name:", value: `${name}`, inline: false })
        .addFields({
          name: "Date Created",
          value: `<t:${parseInt(
            createdTimestamp / 1000
          )}:R> (hover for complete date)`,
          inline: true,
        })
        .addFields({
          name: "Server Owner",
          value: "tungsten",
          inline: true,
        })
        .addFields({
          name: "Server Members",
          value: `${memberCount}`,
          inline: true,
        })
        .addFields({ name: "Role Number", value: `${roles}`, inline: true })
        .addFields({ name: "Emoji Number", value: `${emojis}`, inline: true })
        .addFields({
          name: "Server Boosts",
          value: `${guild.premiumSubscriptionCount}`,
          inline: true,
        });

      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      logger.error(error);
      await interaction.reply({
        embeds: [errorEmbed(client, interaction, error)],
        ephemeral: true,
      });
    }
  },
};
