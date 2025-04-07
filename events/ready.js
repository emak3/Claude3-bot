const { Events, Client, Routes, ActivityType } = require("discord.js");
const { oldHanhan, getConfig } = require('../config.js');
const log = require("../logger.js");

module.exports = {
    name: Events.ClientReady,
    /**
     * @param {Client} client
     */
    async execute(client) {

        await getConfig();
        await oldHanhan(client);
    
        client.user.setActivity({
            name: 'Model: Claude 3.5 haiku 2024/10/22',
            type: ActivityType.Playing
        });
        log.info('Bot is online!');

        const commands = [];
        for (const command of client.commands.values()) {
            commands.push(command.command.toJSON());
        }
        (async () => {
            try {
                log.info(`Started refreshing ${commands.length} application (/) commands.`);
                const data = await client.rest.put(Routes.applicationCommands(client.user.id), {
                    body: commands,
                });
                log.info(`${data.length} 個のApplication Commandsを登録。`);
            } catch (error) {
                log.error(error);
            }
        })();
    }
}