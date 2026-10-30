import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Payment } from "../types";
import { money } from "../utils/format";

export function PaymentForm({ balance, onSubmit }: { balance: number; onSubmit: (payment: Payment) => void }) {
  const [amount, setAmount] = useState(""); const [message, setMessage] = useState("");
  const submit = (event: React.FormEvent) => { event.preventDefault(); const value = Number(amount.replace(/,/g, "")); if (!value || value <= 0) { setMessage("Enter an amount greater than ₦0."); return; } if (value > balance) { setMessage(`Payment cannot be more than the outstanding ${money(balance)}.`); return; } onSubmit({ id: crypto.randomUUID(), studentId: "", amount: value, date: new Date().toISOString() }); setAmount(""); setMessage(`Payment of ${money(value)} recorded successfully.`); };
  const change = (value: string) => { const digits = value.replace(/[^\d]/g, ""); setAmount(digits ? Number(digits).toLocaleString("en-NG") : ""); setMessage(""); };
  return <form onSubmit={submit} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><h2 className="font-bold text-ink">Make a mock payment</h2><p className="mt-1 text-sm text-slate-500">Outstanding: <strong className="text-coral">{money(balance)}</strong></p><div className="mt-4 flex gap-2"><input required type="text" inputMode="numeric" value={amount} onChange={(e) => change(e.target.value)} placeholder="Enter amount, e.g. 45,000" className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-teal" /><button disabled={!balance} className="h-11 rounded-xl bg-teal px-4 text-sm font-bold text-white transition hover:bg-[#117764] disabled:opacity-40">Pay</button></div>{message && <p className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${message.includes("successfully") ? "bg-mint text-teal" : "bg-[#FFF0EC] text-coral"}`}>{message.includes("successfully") && <CheckCircle2 size={16} />}{message}</p>}</form>;
}
