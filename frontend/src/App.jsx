import { useState, useEffect } from "react";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("krishi_user") || "null");
    if (savedUser) {
      setUser(savedUser);
      setPage("dashboard");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("krishi_user");
    setUser(null);
    setPage("home");
  };

  return (
    <div>
      {page === "home" && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
          <h1 className="text-5xl font-bold mb-4">🌱 Krishi Sakha</h1>
          <p className="mb-6 text-lg text-gray-700">
            Welcome! Click below to create an account.
          </p>
          <button
            onClick={() => setPage("signup")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Get Started
          </button>
        </div>
      )}

      {page === "signup" && (
        <Signup setPage={setPage} setUser={setUser} />
      )}

      {page === "dashboard" && (
        <Dashboard user={user} handleLogout={handleLogout} />
      )}
    </div>
  );
}
