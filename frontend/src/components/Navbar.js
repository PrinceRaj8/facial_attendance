import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl">Face Recognition Attendance</h1>
      {user ? (
        <button onClick={() => { logout(); router.push("/login"); }} className="bg-red-500 px-4 py-2">
          Logout
        </button>
      ) : (
        <button onClick={() => router.push("/login")} className="bg-blue-500 px-4 py-2">
          Login
        </button>
      )}
    </nav>
  );
}
