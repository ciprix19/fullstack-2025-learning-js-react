import { useEffect } from "react";

export default function useCheckKey(key: string) {
    useEffect(() => {
        setInterval(() => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                console.log('Theme key exists');
            } else {
                console.log('Theme key does not exist');
            }
        }, 5000);
    }, [])
}