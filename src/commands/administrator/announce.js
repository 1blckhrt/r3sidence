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
    .setName("announcement")
    .setDescription("Announces a message to a channel.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the announcement.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to announce.")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("mention")
        .setDescription("Whether to mention everyone.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the embed.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("The description of the embed.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    try {
      const channel = interaction.options.getChannel("channel");
      const message = interaction.options.getString("message");
      const mention = interaction.options.getBoolean("mention");
      const title = interaction.options.getString("title");
      const description = interaction.options.getString("description");

      const { EmbedBuilder } = require("discord.js");

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor("DarkButNotBlack")
        .addFields({ name: "Message", value: message })
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      if (mention) {
        await channel.send({ content: "@everyone", embeds: [embed] });
      } else {
        await channel.send({ embeds: [embed] });
      }

      const successEmbed = new EmbedBuilder()
        .setTitle("✔️ Announcement Sent")
        .setDescription(`The announcement has been sent to <#${channel.id}>.`)
        .setColor("Green")
        .setTimestamp()
        .setFooter({
          text: `Requested by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      return await interaction.reply({
        embeds: [successEmbed],
        ephemeral: true,
      });
    } catch (error) {
      logger.error(error);
      const errEmbed = errorEmbed(client, interaction, error);
      return await interaction.reply({ embeds: [errEmbed] });
    }
  },
};
