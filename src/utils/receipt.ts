import { Payment, Student } from "../types";
import { money, shortDate } from "./format";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
}[character] || character));

export function printReceipt({ schoolName, student, payment, className }: { schoolName: string; student: Student; payment: Payment; className: string }) {
  const printWindow = window.open("", "_blank", "width=720,height=720");
  if (!printWindow) {
    window.alert("Please allow pop-ups to print the receipt.");
    return;
  }

  printWindow.document.write(`<!doctype html>
    <html><head><title>${escapeHtml(schoolName)} payment receipt</title>
    <style>
      body { margin: 0; padding: 40px; color: #172a3a; font: 16px Arial, sans-serif; }
      .receipt { max-width: 560px; margin: auto; border: 1px solid #dbe5e1; padding: 32px; }
      .header { border-bottom: 2px solid #168b74; padding-bottom: 20px; }
      h1 { margin: 0 0 8px; font-size: 24px; } p { margin: 6px 0; color: #64748b; }
      .amount { margin: 28px 0; padding: 20px; background: #e8f7f1; }
      .amount strong { display: block; margin-top: 8px; color: #168b74; font-size: 28px; }
      .row { display: flex; justify-content: space-between; gap: 20px; border-bottom: 1px solid #edf2f0; padding: 12px 0; }
      .row strong { text-align: right; } .footer { margin-top: 28px; font-size: 12px; }
      @media print { body { padding: 0; } .receipt { border: 0; } }
    </style></head><body><article class="receipt">
      <header class="header"><h1>${escapeHtml(schoolName)}</h1><p>Official school fees payment receipt</p></header>
      <div class="amount"><p>Amount received</p><strong>${money(payment.amount)}</strong></div>
      <div class="row"><span>Student</span><strong>${escapeHtml(student.name)}</strong></div>
      <div class="row"><span>Class</span><strong>${escapeHtml(className)}</strong></div>
      <div class="row"><span>Payment date</span><strong>${shortDate(payment.date)}</strong></div>
      <div class="row"><span>Receipt reference</span><strong>${escapeHtml(payment.id)}</strong></div>
      <p class="footer">Keep this receipt for your records. Thank you for paying your I-tree school fees.</p>
    </article><script>window.onload = function () { window.print(); window.onafterprint = function () { window.close(); }; };</script>
    </body></html>`);
  printWindow.document.close();
}
