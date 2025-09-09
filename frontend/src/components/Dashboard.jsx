
import { useState } from "react";
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
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Crop Recommendations</h2>
      <p className="text-gray-700">Get AI-powered crop suggestions based on your soil and weather data. (Feature coming soon!)</p>
    </div>
  );
}

function WeatherForecast() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Weather Forecast</h2>
      <p className="text-gray-700">Stay updated on local weather. (Feature coming soon!)</p>
    </div>
  );
}

function SoilAnalysis() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Soil Analysis</h2>
      <p className="text-gray-700">Analyze soil health and nutrients. (Feature coming soon!)</p>
    </div>
  );
}

function PestAlerts() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Pest Alerts</h2>
      <p className="text-gray-700">Get alerts about pests in your area. (Feature coming soon!)</p>
    </div>
  );
}

function MarketPrices() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Market Prices</h2>
      <p className="text-gray-700">Check current market prices for crops. (Feature coming soon!)</p>
    </div>
  );
}

function AIAssistant() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">AI Assistant</h2>
      <p className="text-gray-700">Ask questions and get AI-powered answers. (Feature coming soon!)</p>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-green-700">Settings</h2>
      <p className="text-gray-700">Manage your account and preferences. (Feature coming soon!)</p>
    </div>
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
