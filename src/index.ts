import { config } from "dotenv";
import { Client } from "revolt.js";
import fs from "fs";
import { Command } from "./interfaces/command";

config();

const client = new Client({
    autoReconnect: true
});

export const commands = new Map<string, Command>();
export const aliases = new Map<string, Command>();

export function loadCommand() {
    fs.readdirSync("./commands").forEach(async (dirs) => {
        const cmds = fs.readdirSync(`./commands/${dirs}`).filter((file) => file.endsWith(".js"));

        for(const file of cmds) {
            const { command } = await import(`./commands/${dirs}/${file}`);

            commands.set(command.name, command);
            console.log(`Command loaded: ${command.name}`);

            if(command.aliases?.length) {
                command.aliases.forEach((alias: string) => aliases.set(alias, command))
            }
        }
    });
}

export function loadEvent() {
    fs.readdirSync("./commands").forEach(async (file) => {
        if(!file.endsWith(".js")) return;

        const { event } = await import(`./events/${file}`);
        client.on(event.name, event.run.bind(null, client));
    });
}

client.loginBot(process.env.TOKEN!);