import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
interface user{
    name?: string;
    uid?:string;
    gameId?:string;
}

export const user = writable({} as user);

