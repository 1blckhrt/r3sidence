const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

module.exports = {
data: new SlashCommandBuilder()
.setName("ping")
.setDescription("Ping! Pong!"),
/**
 * @param {ChatInputCommandInteraction} interaction
 */
execute(interaction) {
    interaction.reply("Pong!");
}
}