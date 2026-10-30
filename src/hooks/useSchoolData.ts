import { useCallback, useEffect, useState } from "react";
import { createSeedData } from "../data/seed";
import { Payment, SchoolData } from "../types";
import { getSchoolData, getUsers, saveSchoolData } from "../utils/storage";

export function useSchoolData(enabled = true) {
  const [data, setData] = useState<SchoolData | null>(null);
  useEffect(() => {
    if (!enabled) {
      setData(null);
      return;
    }
    const stored = getSchoolData();
    const base = stored || createSeedData();
    const registeredStudents = getUsers().filter((user) => user.role === "student" && user.classId);
    const students = registeredStudents.map((user) => ({ id: user.id, userId: user.id, name: user.name, email: user.email, classId: user.classId! }));
    const next = { ...base, students };
    saveSchoolData(next);
    setData(next);
    const sync = () => { const latest = getSchoolData(); if (latest) setData(latest); };
    window.addEventListener("schooldesk:data-updated", sync);
    return () => window.removeEventListener("schooldesk:data-updated", sync);
  }, [enabled]);
  const update = useCallback((next: SchoolData) => {
    setData(next);
    saveSchoolData(next);
    window.dispatchEvent(new Event("schooldesk:data-updated"));
  }, []);
  const reset = useCallback(() => { const seeded = createSeedData(); update(seeded); }, [update]);
  const addPayment = useCallback((payment: Payment) => { if (data) update({ ...data, payments: [...data.payments, payment] }); }, [data, update]);
  const updateClassFee = useCallback((classId: string, amount: number) => { if (data) update({ ...data, classFees: { ...data.classFees, [classId]: amount } }); }, [data, update]);
  const updateClassFees = useCallback((classFees: Record<string, number>) => { if (data) update({ ...data, classFees }); }, [data, update]);
  return { data, reset, addPayment, updateClassFee, updateClassFees };
}
