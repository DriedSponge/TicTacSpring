import axios from "axios"
import {isAuthenticated, user} from "$lib/store"

export async function createClient(): Promise<boolean> {
    if(!isAuthenticated){
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
    }else{
        return true;
    }
    
}