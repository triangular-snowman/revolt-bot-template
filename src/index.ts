import { config } from "dotenv";
import { Client } from "revolt.js";
import { readdirSync } from "fs";
import { Command } from "./interfaces/command";
config();

const client = new Client({
    autoReconnect: true
});

export const commands = new Map<string, Command>();
export const aliases = new Map<string, Command>();


readdirSync("./commands/").forEach((dirs) => {
    if(dirs.endsWith(".js")) return;
    const cmds = readdirSync(`./commands/${dirs}/`).filter((file) => file.endsWith(".js"));

    for(const file of cmds) {
        const { command } = require(`./commands/${dirs}/${file}`);

        commands.set(command.name, command);
        console.log(`Command loaded: ${command.name}`);

        if(command.aliases?.length) {
            command.aliases.forEach((alias: string) => aliases.set(alias, command))
        }
    }
});

readdirSync("./events/").forEach((file) => {
    if(!file.endsWith(".js")) return;

    const { event } = require(`./events/${file}`);
    client.on(event.name, (...args) => event.run(client, ...args));
});

client.loginBot(process.env.TOKEN!);