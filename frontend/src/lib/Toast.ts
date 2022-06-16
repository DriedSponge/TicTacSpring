import { toast } from "@zerodevx/svelte-toast";

export function errorToast(message: string) {
    toast.push({
        msg: message,
        duration: 4000,
        pausable: true,
        theme: {
            "--toastBackground": "#F56565",
            "--toastBarBackground": "#C53030",
        },
    });
}