const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, Options} = require("discord.js");
const {loadCommands} = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads your commands/events.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((Options) => Options
        .setName("events")
        .setDescription("Reloads your events."))
        .addSubcommand((options) => options
        .setName("commands")
        .setDescription("Reloads your comamnds")),
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
        execute(interaction, client) {
            const subCommand = interaction.options.getSubCommand();

            switch(subCommand) {
                case "event": {
                    for( const [key, value] of client.events )
                    client.removeListener(`${key}`, value, true);
                    loadEvents (client);
                    interaction.reply({content: "Reloaded Events", ephemeral: true})
                    
                }
                break;
                case "command" : {
                    loadCommands (client);
                    interaction.reply({content: "Reloaded Commands", ephemeral: true});
                }

                }
            }
        }
