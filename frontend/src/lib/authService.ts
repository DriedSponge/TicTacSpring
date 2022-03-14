import axios from "axios"
import {isAuthenticated, user} from "$lib/store"

/**
 * Sends a request to invalidate the session on the server
 * @returns Whether the session invaidation was sucessful or not.
 */
export async function logout(): Promise<boolean> {
    return await axios.post("http://localhost:8080/auth/logout",null, { withCredentials: true }).then(res => {
        console.log("Session invalidated.")
        createClient()
        return true;
    })
    .catch((err) => {
        console.log("Error invalidating session.")
        return false;
    })
}

export async function createClient(): Promise<boolean> {
        let authed: boolean = false;
        await axios.get("http://localhost:8080/auth/me", { withCredentials: true }).then(res => {
            authed = true;
            isAuthenticated.set(true);
            user.set(res.data.user)
        })
        .catch((err) => {
            authed = false
            isAuthenticated.set(false);
        })
        return authed;    
}