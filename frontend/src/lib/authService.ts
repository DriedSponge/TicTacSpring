import axios from "axios"
import {isAuthenticated, user} from "$lib/store"

export async function createClient(): Promise<boolean> {
    let authed: boolean = false;
    await axios.get("http://localhost:8080/auth/profile", { withCredentials: true }).then(res => {
        authed = true;
        isAuthenticated.set(true);
        user.set(res.data)
    })
    .catch((err) => {
        authed = false
        isAuthenticated.set(false);
    })
    return authed;
}