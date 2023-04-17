const {Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.config = require("/Users/fyred/Desktop/r3sidence-bot/config.json");
client.login(client.config.token);
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

client.on("ready", async () => {
    try {
        const channel = await client.channels.cache.get('1050996646219096064');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Danger)
            );
        });

        await channel.send({
            content: "Select your age range below.",
            components: [row],
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
});

