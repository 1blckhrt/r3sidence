const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction} = require("discord.js");
const Transcripts = require("discord-html-transcripts");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specified amount of messages from a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName("amount")
        .setDescription("Provide the amount of messages you intend to clear.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .addStringOption(options => options 
        .setName("reason")
        .setDescription("Reasoning for clearing messages.")
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName("target")
        .setDescription("Provide the target member to clear messages from.")
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const Amount = interaction.options.getNumber("amount");
        const Reason = interaction.options.getString("reason");
        const Target = interaction.options.getUser("target");
        
        const channelMessages = await interaction.channel.messages.fetch();
        const logChannel = interaction.guild.channels.cache.get("1054992523434672128");

        const responseEmbed = new EmbedBuilder().setColor("DarkRed");
        const logEmbed = new EmbedBuilder().setColor("DarkGrey")
        .setAuthor({name: "Clear command used"});
    
        let logEmbedDescription = [
            `- Administrator: ${interaction.member}`,
            `- Target: ${Target || "None"}`,
            `- Channel: ${interaction.channel}`,
            `- Reason: ${Reason || "None"}`,
        ];
    
    if(Target) {
        let i =0;
        let messagesToDelete = [];
        channelMessages.filter((message) => {
            if(message.author.id === Target.id && Amount > i) {
                messagesToDelete.push(message);
                i++
            }
        });

        const Transcript = await Transcripts.generateFromMessages(messagesToDelete, interaction.channel);

        interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
            interaction.reply({embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages from ${Target}`)],
            ephemeral: true
        });

        logEmbedDescription.push(`- Total Messages: ${messages.size}`);
        logChannel.send({
            embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))],
            files: [Transcript]
        });
        });
    } else {
        const Transcript = await Transcripts.createTranscript(interaction.channel, { limit: Amount});

        interaction.channel.bulkDelete(Amount, true).then((messages) => {
            interaction.reply({embeds: [responseEmbed.setDescription(`Cleared \`${messages.size}\` messages.`)],
            ephemeral: true
        });

        logEmbedDescription.push(`- Total Messages: ${messages.size}`);
        logChannel.send({
            embeds: [logEmbed.setDescription(logEmbedDescription).join("\n")],
            files: [Transcript]
        });
    });
}
}};