import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";

export default function Dashboard({ user, handleLogout }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar user={user} activeMenu={activeMenu} onMenuSelect={setActiveMenu} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-green-50 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-14 md:mt-0 break-words max-w-full pr-2">
            {getPageTitle(activeMenu, user)}
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-4 sm:mt-0 w-fit"
          >
            Logout
          </button>
        </div>

        <div>
          {activeMenu === "dashboard" && <DashboardHome />}
          {activeMenu === "crop" && <CropRecommendations />}
          {activeMenu === "weather" && <WeatherForecast />}
          {activeMenu === "soil" && <SoilAnalysis />}
          {activeMenu === "pest" && <PestAlerts />}
          {activeMenu === "market" && <MarketPrices />}
          {activeMenu === "ai" && <AIAssistant />}
          {activeMenu === "settings" && <SettingsPage />}
        </div>
      </div>
    </div>
  );
}

function getPageTitle(menu, user) {
  switch (menu) {
    case "dashboard":
      return `Welcome, ${user?.name || "Farmer"}!`;
    case "crop":
      return "Crop Recommendations";
    case "weather":
      return "Weather Forecast";
    case "soil":
      return "Soil Analysis";
    case "pest":
      return "Pest Alerts";
    case "market":
      return "Market Prices";
    case "ai":
      return "AI Assistant";
    case "settings":
      return "Settings";
    default:
      return "Dashboard";
  }
}

function DashboardHome() {
  return (
    <>
      <p className="text-gray-700 mb-6">
        This is your personalized dashboard. Add features like crop recommendations, weather updates, and AI Assistant here!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard title="Crop Recommendations" desc="Get AI-powered crop suggestions." />
        <FeatureCard title="Weather Forecast" desc="Stay updated on local weather." />
        <FeatureCard title="Soil Analysis" desc="Analyze soil health and nutrients." />
      </div>
    </>
  );
}

function CropRecommendations() {
  const tips = [
    {
      crop: "Wheat",
      season: "Rabi",
      reason: "Suitable soil moisture and 20-25°C temperature expected",
      action: "Sow certified seeds; apply balanced NPK (60:40:40)",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      crop: "Rice",
      season: "Kharif",
      reason: "Monsoon rainfall forecast above normal in your area",
      action: "Prepare nursery beds; ensure field leveling",
      color: "bg-lime-50 border-lime-200"
    },
    {
      crop: "Chickpea",
      season: "Rabi",
      reason: "Soil organic matter moderate; minimal pest pressure",
      action: "Seed treat with Trichoderma; avoid waterlogging",
      color: "bg-amber-50 border-amber-200"
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800"><span className="font-semibold">AI Tip:</span> Based on recent weather and typical soil in your region, these crops are favorable this season.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tips.map((t, idx) => (
          <div key={idx} className={`rounded-lg border ${t.color} p-5 shadow-sm hover:shadow transition`}> 
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{t.crop}</h3>
                <p className="text-sm text-gray-600">Season: {t.season}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-white border text-green-700">Recommended</span>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <p className="mb-1"><span className="font-medium">Why:</span> {t.reason}</p>
              <p><span className="font-medium">Do now:</span> {t.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherForecast() {
  const [view, setView] = useState("daily");
  const daily = [
    { day: "Today", temp: 29, rain: 20, wind: 8, icon: "🌤️" },
    { day: "Tue", temp: 31, rain: 40, wind: 10, icon: "🌦️" },
    { day: "Wed", temp: 28, rain: 10, wind: 6, icon: "☀️" },
    { day: "Thu", temp: 27, rain: 60, wind: 12, icon: "⛈️" },
    { day: "Fri", temp: 30, rain: 30, wind: 9, icon: "🌤️" },
  ];
  const weekly = [
    { week: "This Week", avgTemp: 29, rain: 32 },
    { week: "Next Week", avgTemp: 27, rain: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button className={`px-3 py-1 rounded-full text-sm ${view === "daily" ? "bg-green-600 text-white" : "bg-white border"}`} onClick={() => setView("daily")}>Daily</button>
        <button className={`px-3 py-1 rounded-full text-sm ${view === "weekly" ? "bg-green-600 text-white" : "bg-white border"}`} onClick={() => setView("weekly")}>Weekly</button>
      </div>

      {view === "daily" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {daily.map((d, i) => (
            <div key={i} className="bg-white rounded-lg border shadow-sm p-4 flex flex-col items-center">
              <div className="text-3xl" aria-hidden>{d.icon}</div>
              <p className="mt-2 font-semibold text-gray-800">{d.day}</p>
              <p className="text-gray-600 text-sm">Temp: {d.temp}°C</p>
              <p className="text-gray-600 text-sm">Rain: {d.rain}%</p>
              <p className="text-gray-600 text-sm">Wind: {d.wind} km/h</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weekly.map((w, i) => (
            <div key={i} className="bg-white rounded-lg border shadow-sm p-4">
              <p className="font-semibold text-gray-800">{w.week}</p>
              <div className="mt-2 flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600">Avg Temp</p>
                  <p className="text-lg font-bold">{w.avgTemp}°C</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rain Probability</p>
                  <p className="text-lg font-bold">{w.rain}%</p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${w.rain}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SoilAnalysis() {
  const nutrients = [
    { name: "Nitrogen (N)", value: 65, color: "bg-emerald-500" },
    { name: "Phosphorus (P)", value: 45, color: "bg-blue-500" },
    { name: "Potassium (K)", value: 70, color: "bg-amber-500" },
    { name: "Organic Matter", value: 40, color: "bg-lime-600" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Soil Nutrient Report</h2>
        <div className="space-y-4">
          {nutrients.map((n, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{n.name}</span>
                <span className="text-gray-600">{n.value}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded">
                <div className={`h-3 ${n.color} rounded`} style={{ width: `${n.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-white border border-amber-200 rounded-lg p-4">
        <p className="text-amber-800 text-sm"><span className="font-semibold">AI Tip:</span> Apply compost and 20:20:0 N:P:K in basal dose; avoid over-irrigation to preserve nutrients.</p>
      </div>
    </div>
  );
}

function PestAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, pest: "Fall Armyworm", crop: "Maize", severity: "High", advice: "Inspect whorl leaves; use pheromone traps.", seen: false },
    { id: 2, pest: "Aphids", crop: "Mustard", severity: "Medium", advice: "Release ladybird beetles; avoid broad-spectrum sprays.", seen: false },
    { id: 3, pest: "Stem borer", crop: "Rice", severity: "Low", advice: "Maintain water level; clip seedling tips.", seen: true },
  ]);

  const badge = (sev) => {
    if (sev === "High") return "bg-red-100 text-red-700 border-red-200";
    if (sev === "Medium") return "bg-amber-100 text-amber-700 border-amber-200";
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  };

  return (
    <div className="space-y-4">
      {alerts.map((a) => (
        <div key={a.id} className="bg-white border rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{a.pest} on {a.crop}</p>
              <p className="text-sm text-gray-600">{a.advice}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs rounded-full border ${badge(a.severity)}`}>{a.severity}</span>
              <button onClick={() => setAlerts(prev => prev.map(x => x.id === a.id ? { ...x, seen: !x.seen } : x))} className={`text-sm px-3 py-1 rounded ${a.seen ? "bg-gray-100" : "bg-green-600 text-white"}`}>
                {a.seen ? "Seen" : "Mark as seen"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketPrices() {
  const data = [
    { crop: "Wheat", unit: "₹/quintal", price: 2250, trend: "+2%" },
    { crop: "Rice", unit: "₹/quintal", price: 2400, trend: "-1%" },
    { crop: "Tomato", unit: "₹/kg", price: 22, trend: "+8%" },
    { crop: "Onion", unit: "₹/kg", price: 28, trend: "-3%" },
  ];
  const trendClass = (t) => t.startsWith("+") ? "text-emerald-700" : t.startsWith("-") ? "text-red-700" : "text-gray-700";
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-green-700">Market Prices</h2>
        <p className="text-gray-600 text-sm">Sample rates for reference. Check your local mandi for exact prices.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-700">
              <th className="px-4 py-2">Crop</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 font-medium text-gray-800">{row.crop}</td>
                <td className="px-4 py-2 text-gray-700">{row.unit}</td>
                <td className="px-4 py-2 text-gray-700">{row.price}</td>
                <td className={`px-4 py-2 font-semibold ${trendClass(row.trend)}`}>{row.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Namaste! How can I help with your farm today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const content = input.trim();
    if (!content) return;
    setMessages((m) => [...m, { role: "user", text: content }]);
    setInput("");
    // Simulated AI reply
    setTimeout(() => {
      const hint = content.toLowerCase().includes("wheat")
        ? "For wheat, keep soil moist during germination and apply N in 2 splits."
        : content.toLowerCase().includes("pest")
        ? "Regularly scout fields early morning; use traps before spraying."
        : "I suggest crop rotation and balanced fertilization for better yield.";
      setMessages((m) => [...m, { role: "assistant", text: hint }]);
    }, 700);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-[70vh] max-h-[80vh]">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-green-700">AI Assistant</h2>
        <p className="text-xs text-gray-500">This is a demo chat. No data leaves your device.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50/40">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] w-fit px-3 py-2 rounded-lg ${m.role === "assistant" ? "bg-white border text-gray-800" : "bg-green-600 text-white ml-auto"}`}>
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-3 border-t bg-white">
        <div className="flex items-end gap-2">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} rows={1} placeholder="Type your question..." className="flex-1 resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button onClick={send} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Send</button>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const saved = JSON.parse(localStorage.getItem("krishi_user") || "null") || {};
  const [name, setName] = useState(saved.name || "");
  const [village, setVillage] = useState(saved.village || "");
  const [crops, setCrops] = useState(saved.crops || "");
  const [savedOk, setSavedOk] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const next = { ...saved, name, village, crops };
    localStorage.setItem("krishi_user", JSON.stringify(next));
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 1500);
  };

  return (
    <form onSubmit={save} className="bg-white shadow rounded-lg p-6 max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Profile & Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., Ramesh Kumar" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Village / Location</label>
          <input value={village} onChange={(e) => setVillage(e.target.value)} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., Nashik" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Primary Crops</label>
          <input value={crops} onChange={(e) => setCrops(e.target.value)} className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="e.g., Wheat, Onion" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save</button>
        {savedOk && <span className="text-emerald-700 text-sm">Saved! Reopen dashboard to see your name updated.</span>}
      </div>
    </form>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white shadow rounded-lg p-5 hover:shadow-md transition">
      <h2 className="text-lg font-semibold mb-2 text-green-700">{title}</h2>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
