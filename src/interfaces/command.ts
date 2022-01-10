import { Client } from "revolt.js";
import { Message } from "revolt.js/dist/maps/Messages";

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    usage?: string[];
    run: (client: Client, message: Message, args: string[]) => unknown | Promise<unknown>;
}