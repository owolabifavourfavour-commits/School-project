import { SchoolData, User } from "../types";

const USERS_KEY = "itree_users";
const CURRENT_USER_KEY = "itree_current_user";
const SCHOOL_KEY = "itree_school_data";

export function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as User[]; } catch { return []; }
}
export function saveUsers(users: User[]) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
export function getCurrentUser(): User | null {
  try { return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null") as User | null; } catch { return null; }
}
export function saveCurrentUser(user: User | null) {
  if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(CURRENT_USER_KEY);
}
export function getSchoolData(): SchoolData | null {
  try { return JSON.parse(localStorage.getItem(SCHOOL_KEY) || "null") as SchoolData | null; } catch { return null; }
}
export function saveSchoolData(data: SchoolData) { localStorage.setItem(SCHOOL_KEY, JSON.stringify(data)); }
