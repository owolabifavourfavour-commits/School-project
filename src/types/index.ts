export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "student";
  classId?: string;
}

export interface SchoolClass { id: string; name: string; section: "Primary" | "Secondary"; }
export interface Student { id: string; userId: string; name: string; email: string; classId: string; }
export interface Payment { id: string; studentId: string; amount: number; date: string; }

export interface SchoolData {
  schoolName: string;
  classes: SchoolClass[];
  classFees: Record<string, number>;
  students: Student[];
  payments: Payment[];
}
