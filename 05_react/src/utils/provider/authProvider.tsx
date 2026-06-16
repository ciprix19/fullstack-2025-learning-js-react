import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces/user";
import useFetchData from "../hooks/useFetchData";


export function AuthProvider({ children }: { children: React.ReactNode} ) {
    const [user, setUser] = useState<User | null>(null);
    const fetched = useFetchData('http://localhost:3000/users/token', { credentials: 'include' })

    // i need to check if the request sent at /token contains the cookie with the refresh token
    useEffect(() => {
        if (fetched?.user) {
            setUser(fetched.user);
        }
    }, [fetched]);

    return (
        <AuthContext value={{ user, setUser }}>
            {children}
        </AuthContext>
    );
}