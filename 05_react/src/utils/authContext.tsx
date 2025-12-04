import { createContext } from "react";
import type { User } from "../interfaces/user";

interface AuthContextType {
    user: User | null;
    setUser: (u: User | null) => void;
}
//todo
export const AuthContext = createContext<AuthContextType | null>(null);
