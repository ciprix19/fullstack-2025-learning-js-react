import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import type { User } from "../interfaces/user";


export function AuthProvider({ children }: { children: React.ReactNode} ) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {

        } catch (e) {

        }
    }, [user]);

    return (
        <AuthContext value={{ user, setUser }}>
            {children}
        </AuthContext>
    );
}