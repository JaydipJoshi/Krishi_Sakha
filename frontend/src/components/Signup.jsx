import { useState } from "react";

export default function Signup({ setPage, setUser }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const validPhone = /^\d{10}$/.test(number);

  const login = () => {
    if (!validPhone) {
      setError("Enter a valid 10 digit number.");
      return;
    }
    const newUser = { name: name || "Farmer", number };
    localStorage.setItem("krishi_user", JSON.stringify(newUser));
    setUser(newUser);
    setPage("dashboard");
  };

  const register = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your full name.");
    if (!validPhone) return setError("Phone number must be 10 digits.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    const newUser = { name: name.trim(), number: number.trim() };
    localStorage.setItem("krishi_user", JSON.stringify(newUser));
    setUser(newUser);
    setPage("dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-amber-50">
      <div className="mt-14 sm:mt-0 text-center px-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg">
          <span className="text-2xl" aria-hidden>🌱</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-800">FarmAI Assistant</h1>
        <p className="text-gray-600">Your Personal Farming Guide</p>
      </div>

      <div className="mt-8 w-full max-w-xl px-4">
        <div className="bg-white/90 backdrop-blur rounded-xl border border-green-100 shadow-md overflow-hidden">
          <div className="px-6 pt-5">
            <h2 className="text-2xl font-bold text-gray-900 flex justify-center align-middle">Welcome, Farmer!</h2>
            <p className="text-sm text-gray-500 mb-4 flex justify-center align-middle">Login or create your account to get started</p>
            <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-full w-full sm:w-80 mx-auto">
              <button
                className={`py-2 rounded-full text-sm font-medium  ${mode === "login" ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`py-2 rounded-full text-sm font-medium ${mode === "register" ? "bg-white shadow text-gray-900" : "text-gray-600"}`}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
          </div>

          {error && (
            <div className="px-6">
              <p className="text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 text-sm mt-3">{error}</p>
            </div>
          )}

          {mode === "login" ? (
            <div className="px-6 pb-6 pt-4">
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter 10 digit number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, ""))}
                  className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  disabled={!validPhone}
                  onClick={() => setOtpSent(true)}
                  className={`px-4 rounded-md ${validPhone ? "bg-amber-300 hover:bg-amber-400" : "bg-amber-200 cursor-not-allowed"}`}
                >
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </button>
              </div>
              <button
                onClick={login}
                className={`mt-4 w-full sm:w-80 mx-auto block py-2 rounded-md text-white font-semibold ${validPhone ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"}`}
                disabled={!validPhone}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setPage("home")}
                className="mt-3 w-full sm:w-80 mx-auto block py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Back
              </button>
            </div>
          ) : (
            <form onSubmit={register} className="px-6 pb-6 pt-4">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="10 digit number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, ""))}
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Preferred Language</label>
                  <select className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" defaultValue="ml">
                    <option value="ml">മലയാളം (Malayalam)</option>
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Village/District"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Soil Type</label>
                  <select className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" defaultValue="Loamy">
                    <option>Loamy</option>
                    <option>Clay</option>
                    <option>Sandy</option>
                    <option>Silty</option>
                    <option>Peaty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Farm Size (in acres)</label>
                  <input
                    type="text"
                    placeholder="e.g., 2.5"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm text-gray-700 mb-1">Main Crops</label>
                  <input
                    type="text"
                    placeholder="e.g., Paddy, Banana, Coconut"
                    className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm text-gray-700 mb-1">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md p-2 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 bottom-2 text-sm text-green-700 px-2 py-1 rounded hover:bg-green-50"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full sm:w-80 mx-auto block py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setPage("home")}
                className="mt-3 w-full sm:w-80 mx-auto block py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
