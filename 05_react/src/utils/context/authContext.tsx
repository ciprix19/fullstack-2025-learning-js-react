import React, { createContext, useEffect, useState } from "react";
import type { User } from "../interfaces/user";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});