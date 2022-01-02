import { Client } from "revolt.js";

export interface Event {
    name: string;
    run: (client: Client, ...args: any[]) => unknown | Promise<unknown>;
}