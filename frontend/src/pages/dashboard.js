import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { user } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if not logged in
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // Prevent undefined error
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
};

export default Dashboard;
