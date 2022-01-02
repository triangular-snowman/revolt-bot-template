import { Event } from "../interfaces/event";
import { prefix } from "../config.json";
import { commands, aliases } from "../index";

export const event: Event = {
    name: "message",
    run: async function(client, message) {
        if(message.author_id === "00000000000000000000000000" || typeof message.content !== 'string' || !message.channel) return;
        if(message.author.bot?.owner) return;
        if(message.channel.channel_type !== "TextChannel") return;
        if(message.author_id === client.user!._id) return;

        if(!message.content) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        const command = commands.get(commandName) || aliases.get(commandName);
        if(!command) return;

        await command.run(client, message, args);
    },
};