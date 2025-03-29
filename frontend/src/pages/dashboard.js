import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { markAttendance } from "../utils/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleAttendance = async () => {
    if (!user) return;
    try {
      // For simplicity, user_id is hardcoded as 1. Replace with dynamic user id if available.
      await markAttendance(1, user.token);
      alert("Attendance marked successfully!");
    } catch (error) {
      alert("Error marking attendance");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleAttendance}>Mark Attendance</button>
      </div>
    </div>
  );
}
