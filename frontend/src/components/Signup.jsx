import { useState } from "react";

export default function Signup({ setPage, setUser }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name.trim() || !number.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return false;
    }
    if (!/^\d{10}$/.test(number)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const newUser = { name: name.trim(), number: number.trim() };
    localStorage.setItem("krishi_user", JSON.stringify(newUser));
    setUser(newUser);
    setPage("dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-600 mb-3 text-sm text-center font-medium">
            {error}
          </p>
        )}

        {/* Name Field */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Phone Number Field */}
        <input
          type="tel"
          placeholder="Phone Number (10 digits)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Password Field */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-600 hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name || !number || !password}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            !name || !number || !password
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Sign Up
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setPage("home")}
          className="w-full mt-3 py-2 bg-gray-200 rounded text-black hover:bg-gray-300 transition"
        >
          Back
        </button>
      </form>
    </div>
  );
}
