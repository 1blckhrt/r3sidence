const { Client } = require("discord.js")
const {loadEvents} = require("../../Handlers/commandHandler");

module.exports = {
    name:"ready",
    once: true,
    execute(client) {
        console.log(`${client.user.username} is online!`);
    }};