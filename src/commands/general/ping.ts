import { Command } from "../../interfaces/command";

export const command: Command = {
    name: "ping",
    description: "Check if the bot is online and responsive",
    usage: ["ping"],
    run: async function(client, message) {
        return await message.reply({ content: `:ping_pong: Pong!\nWS: \`${client.websocket.ping}ms\`\nRoundtrip: \`${Date.now() - message.createdAt}ms\`` });
    },
};