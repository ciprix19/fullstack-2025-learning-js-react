import React, { createContext, useState } from "react";
import type { User } from "../interfaces/user";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode} ) {
    const [user, setUser] = useState<User | null>(null);
    return (
        <AuthContext value={{ user, setUser }}>
            {children}
        </AuthContext>
    );
}