import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function AppHeader() {
  const { user, logout } = useAuth();
  return <header className="border-b border-slate-100 bg-white"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"><div className="flex items-center gap-2 font-bold text-ink"><span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white">I</span><span>I-tree <span className="font-normal text-slate-400">School</span></span></div>{user && <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-bold text-ink">{user.name}</p><p className="text-xs capitalize text-slate-400">{user.role} account</p></div><button onClick={logout} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-coral" title="Log out"><LogOut size={18} /></button></div>}</div></header>;
}
