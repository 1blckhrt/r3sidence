const { Client, GatewayIntentBits, Partials, Collection, Guild, ActivityType, Activity, escapeHeading } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
    presence: {activities: [{name: "R3SIDENT EVIL RADIO #R3", type: ActivityType.Listening}],status: "dnd",}
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

client.config = require("./config.json");
const {token} = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

client.login(client.config.token)
.then(async () => {
    console.log(`${client.user.username} is online!`);
    await loadCommands(client);
    await loadEvents(client); 
});

client.on('interactionCreate', async (interaction) => {
    try {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ephemeral: true});
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
            interaction.editReply({content: "I couldn't find that role. Please contact blckhrt#3635",})
        return;
        }
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed.`);
            return;
        }
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);    
    } catch (error) {
        console.log(error)
    };
});


