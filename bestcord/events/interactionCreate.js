module.exports = {
    event: "interactionCreate",
    run: async (interaction, client) => {
        if (interaction.isCommand()) {
            const command = client.interactions.get(interaction.commandName);
        
            if (!command) return interaction.reply({
                content: "Something Went Wrong | Perhaps command not registered?",
                ephemeral: true
            });
        
            command.run(client, interaction);
        }
    }
}