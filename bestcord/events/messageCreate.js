module.exports = {
    event: 'messageCreate',
    run: async (message, client) => {
        if (!message.content.startsWith(client.prefix) || message.author.bot) return;
        const args = message.content.slice(client.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            )

        if (!command) return;

        if (command.guildOnly && message.channel.type !== 'GUILD_TEXT') {
            return message.reply("I can't execute that command inside DMs!");
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${client.prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply)
        }

        // let user = await message.guild.members.cache.get(message.author.id),
        //     bot = await message.guild.members.cache.get(client.user.id)

        // if (command.permissions) {
        //     if (!command.permissions.bot) command.permissions.bot = [];
        //     if (!command.permissions.user) command.permissions.user = [];
        //     let hasPermission = await botPermissionCheck(
        //         message.channel,
        //         user,
        //         bot,
        //         command.permissions,
        //         command.name
        //     );
        //     if (!hasPermission) {
        //         return;
        //     }
        // }

        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to execute that command!')
        }
    }
}
