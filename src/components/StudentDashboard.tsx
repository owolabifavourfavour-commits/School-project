import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSchoolData } from "../hooks/useSchoolData";
import { PaymentForm } from "./PaymentForm";
import { money, shortDate } from "../utils/format";
import { printReceipt } from "../utils/receipt";

export function StudentDashboard({ data, addPayment }: { data: ReturnType<typeof useSchoolData>["data"] & object; addPayment: ReturnType<typeof useSchoolData>["addPayment"] }) {
  const { user } = useAuth();
  if (!data || !user) return null;
  const student = data.students.find((item) => item.userId === user.id);
  if (!student) return <main className="mx-auto max-w-3xl px-4 py-12"><div className="rounded-2xl bg-white p-8 text-center shadow-soft"><h1 className="text-xl font-bold text-ink">Student profile is being prepared</h1><p className="mt-2 text-sm text-slate-500">Please sign out and sign in again.</p></div></main>;
  const required = data.classFees[student.classId] || 0;
  const payments = useMemo(() => data.payments.filter((item) => item.studentId === student.id).sort((a, b) => b.date.localeCompare(a.date)), [data.payments, student.id]);
  const paid = payments.reduce((sum, item) => sum + item.amount, 0);
  const balance = Math.max(required - paid, 0);
  const className = data.classes.find((item) => item.id === student.classId)?.name || student.classId;
  return <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"><div className="mb-8"><p className="text-sm font-bold text-teal">Student dashboard</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Hello, {student.name}</h1><p className="mt-1 text-sm text-slate-500">{className} · {data.schoolName}</p></div><div className="grid gap-3 sm:grid-cols-3"><Summary label="Required fee" value={money(required)} /><Summary label="Amount paid" value={money(paid)} /><Summary label="Outstanding" value={money(balance)} /></div><div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><PaymentForm balance={balance} onSubmit={(payment) => addPayment({ ...payment, studentId: student.id })} /><section className="rounded-2xl border border-slate-100 bg-white shadow-soft"><div className="border-b border-slate-100 p-5"><h2 className="font-bold text-ink">Payment history</h2><p className="mt-1 text-sm text-slate-500">Your recorded payments and printable receipts.</p></div>{payments.length ? <div className="divide-y divide-slate-100">{payments.map((payment) => <div key={payment.id} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-semibold text-ink">Payment</p><p className="text-xs text-slate-400">{shortDate(payment.date)}</p></div><div className="flex items-center gap-3"><span className="font-bold text-teal">{money(payment.amount)}</span><button type="button" onClick={() => printReceipt({ schoolName: data.schoolName, student, payment, className })} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-ink transition hover:border-teal hover:text-teal">Print receipt</button></div></div>)}</div> : <p className="p-8 text-center text-sm text-slate-400">No payments yet.</p>}</section></div></main>;
}
function Summary({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-ink">{value}</p></div>; }
