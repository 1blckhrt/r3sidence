const { Client } = require("discord.js")
const {loadEvents} = require("../../Handlers/commandHandler");

module.exports = {
    name:"assignRole",
    once: true,
    async execute(client) {

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
        } 
    }