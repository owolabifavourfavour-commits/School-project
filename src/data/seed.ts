import { SchoolClass, SchoolData, User } from "../types";

export const classes: SchoolClass[] = [
  ...["Nursery 1", "Nursery 2", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"].map((name, i) => ({ id: `primary-${i + 1}`, name, section: "Primary" as const })),
  ...["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map((name, i) => ({ id: `secondary-${i + 1}`, name, section: "Secondary" as const })),
];

export const adminUser: User = { id: "admin", name: "I-tree Administrator", email: "admin@i-tree.ng", password: "admin123", role: "admin" };

export function createSeedData(): SchoolData {
  const classFees = Object.fromEntries(classes.map((item, index) => [item.id, index < 8 ? 85000 : 120000]));
  return { schoolName: "I-tree (Primary & Secondary)", classes, classFees, students: [], payments: [] };
}
