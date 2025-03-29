import { useState, useContext } from "react";
import { loginUser } from "../utils/api";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      login(data.access_token);
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        <input type="text" placeholder="Username" className="mb-2 p-2 border rounded w-full" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="mb-4 p-2 border rounded w-full" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
