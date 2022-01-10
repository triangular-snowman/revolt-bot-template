// This is the base handler
import { Command } from "../interfaces/command";


export const command: Command = {
    name: "command name",
    description: "command description",
    aliases: ["command alias"],
    usage: ["command usage"],
    run: function(client, message, args) {
        // Do stuff here
        message.reply({ content: `Ping: ${client.websocket.ping}\nArgs: ${args.join(" ")}` });
    },
};