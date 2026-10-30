import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";
import { adminUser } from "../data/seed";
import { getCurrentUser, getUsers, saveCurrentUser, saveUsers } from "../utils/storage";

interface AuthContextValue { user: User | null; signIn: (email: string, password: string) => string | null; signUp: (name: string, email: string, password: string, classId: string) => string | null; logout: () => void; }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const signIn = (email: string, password: string) => {
    const users = getUsers();
    if (email.toLowerCase() === adminUser.email && password === adminUser.password) { setUser(adminUser); saveCurrentUser(adminUser); return null; }
    const found = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!found) return "The email or password is incorrect.";
    setUser(found); saveCurrentUser(found); return null;
  };
  const signUp = (name: string, email: string, password: string, classId: string) => {
    const users = getUsers();
    if (users.some((item) => item.email.toLowerCase() === email.toLowerCase()) || email.toLowerCase() === adminUser.email) return "An account with this email already exists.";
    const newUser: User = { id: crypto.randomUUID(), name, email, password, role: "student", classId };
    saveUsers([...users, newUser]); saveCurrentUser(newUser); setUser(newUser); return null;
  };
  const logout = () => { saveCurrentUser(null); setUser(null); };
  return <AuthContext.Provider value={{ user, signIn, signUp, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
