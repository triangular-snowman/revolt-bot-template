import { Message } from "revolt.js/dist/maps/Messages";
import { Event } from "../interfaces/event";
import { prefix } from "../config";
import { commands, aliases } from "../index";

export const event: Event = {
    name: "message",
    run: async function(client, message: Message) {
        if(message.author_id === "00000000000000000000000000") return;
        if(message.author?.bot?.owner) return;
        if(message.channel!.channel_type !== "TextChannel") return;
        if(message.author_id === client.user!._id) return;

        if(typeof message.content !== "string") {
            if(message.content.type !== "text") return;
            message.content = message.content.content;
        }

        if(!message.content) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift()?.toLowerCase()!;

        const command = commands.get(commandName) || aliases.get(commandName);
        if(!command) return;

        await command.run(client, message, args);
    },
};