import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useSchoolData } from "./hooks/useSchoolData";
import { AppHeader } from "./components/AppHeader";
import { AdminDashboard } from "./components/AdminDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function Shell() {
  const { user } = useAuth(); const { data, updateClassFees, addPayment } = useSchoolData(Boolean(user)); const location = useLocation();
  if (!user && location.pathname === "/") return <Landing />;
  if (["/signin", "/signup"].includes(location.pathname)) return <Routes><Route path="/signin" element={<SignIn />} /><Route path="/signup" element={<SignUp />} /></Routes>;
  return <><AppHeader /><Routes><Route element={<ProtectedRoute role="admin" />}><Route path="/admin" element={data ? <AdminDashboard data={data} updateClassFees={updateClassFees} /> : <Loading />} /></Route><Route element={<ProtectedRoute role="student" />}><Route path="/student" element={data ? <StudentDashboard data={data} addPayment={addPayment} /> : <Loading />} /></Route><Route path="*" element={<Navigate to={user?.role === "admin" ? "/admin" : "/student"} replace />} /></Routes></>;
}
function Loading() { return <div className="grid min-h-[70vh] place-items-center text-slate-400">Loading I-tree School...</div>; }
export default function App() { return <BrowserRouter><AuthProvider><Shell /></AuthProvider></BrowserRouter>; }
