import { Event } from "../interfaces/event";
import { text } from "../config";

export enum Presence {
    Online = "Online",
    Idle = "Idle",
    Busy = "Busy",
    Invisible = "Invisible"
}

export const event: Event = {
    name: "ready",
    run: async function(client) {
        console.log(`${client.user?.username} is ready!`);
        client.users.edit({
            status: {
                text: text,
                presence: Presence.Online,
            },
        });
    },
};