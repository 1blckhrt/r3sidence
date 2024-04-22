const client = require("../client/client.js");
const { registerSlashCommand } = require("./register-commands.js");
const { loadEvents } = require("./load-events.js");
const { loadComponents } = require("./load-components.js");
const logger = require("../../../util/logger.js");
const { handleLogs } = require("../handlers/logHandler.js");
const logs = require("discord-logs");

async function start() {
  try {
    await client.login(process.env.TOKEN);
    await registerSlashCommand(client);
    await loadEvents(client);
    await loadComponents(client);
    logs(client, { debug: true });
    handleLogs(client);
    require("../handlers/anti-crash.js")(client);

    logger.success(`Logged in as ${client.user.tag}!`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = start;
