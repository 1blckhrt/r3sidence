const {Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require("discord.js");
const { execute } = require("./status");
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});
const channelID = "1050996646219096064";
const roles = [
    {
        id: "1097555188753104987",
        label: "under 18 (minor)"
    },
    {
        id: "1097555936744325227",
        label: "18+"
    },
];

module.exports = {
data: new SlashCommandBuilder() 
.setName("sendrolemessage")
.setDescription("Sends the role message in a channel."),
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
execute (interaction) {
    const row = new ActionRowBuilder();
    roles.forEach((role) => {
        row.addComponents(
            new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Secondary)
        );
    });
        interaction.reply({content:"Please select your age range below:", components: [row] });
    }
  };
