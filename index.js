const { Client, GatewayIntentBits, Partials, Collection, Guild, ActivityType, Activity, escapeHeading } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
    partials: [User, Message, GuildMember, ThreadMember],
    presence: {activities: [{name: "R3SIDENT EVIL RADIO #R3", type: ActivityType.Listening}], status: "dnd",}
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

client.config = require("./config.json");
const {token} = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

client.on('messageCreate', (message) => {
    if (message.author.bot) {}
    if (!message.author.bot) {
    if (message.content === "machine gun kelly") {   
      message.reply('quit talking about mgk, shut up bozo');
    }
  }});

client.on('ready', async (client) => {
    console.log(`${client.user.username} is online!`);
    await loadCommands(client);
    await loadEvents(client); 
});

client.login(client.config.token)