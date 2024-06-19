const fs = require('fs')
const path = require('path')
const djs = require('discord.js')

class Client extends djs.Client {
    constructor(token, prefix) {
        super({intents: [
            djs.GatewayIntentBits.Guilds,
            djs.GatewayIntentBits.GuildMessages,
            djs.GatewayIntentBits.MessageContent
        ]})

        this.token = token;
        this.prefix = prefix;

        this.commands = new djs.Collection()
        this.interactions = new djs.Collection()
        
        fs.readdir(path.join(__dirname, './events/'), (err, files) => {
            const eventHandler = require(path.join(__dirname, './eventHandler.js'))
            eventHandler(err, files, this)
        })        
    }

    command(cmd, options={aliases: [], name: undefined, guildOnly: false, args: false, usage: "", description: ""}) {
        this.commands.set(options.name ?? cmd.name, {
            aliases: options.aliases,
            execute: cmd,
            guildOnly: options.guildOnly,
            args: options.args,
            usage: options.usage,
            description: options.description
        })
    }

    start() {
        this.login(this.token);
    }
}

module.exports = {Client}