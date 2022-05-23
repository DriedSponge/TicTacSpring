import { writable, derived } from "svelte/store";

export const isAuthenticated = writable(false);
interface user{
    name?: string;
    uid?:string;
    gameId?:number;
}

export const user = writable({} as user);

