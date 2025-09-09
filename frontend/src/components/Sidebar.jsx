import {
  Home,
  Sprout,
  CloudSun,
  FlaskConical,
  Bug,
  TrendingUp,
  Brain,
  Settings,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { useState } from "react";
  

  const MENUS = [
    { key: "dashboard", icon: <Home size={20} />, text: "Dashboard" },
    { key: "crop", icon: <Sprout size={20} />, text: "Crop Recommendations" },
    { key: "weather", icon: <CloudSun size={20} />, text: "Weather Forecast" },
    { key: "soil", icon: <FlaskConical size={20} />, text: "Soil Analysis" },
    { key: "pest", icon: <Bug size={20} />, text: "Pest Alerts" },
    { key: "market", icon: <TrendingUp size={20} />, text: "Market Prices" },
    { key: "ai", icon: <Brain size={20} />, text: "AI Assistant" },
    { key: "settings", icon: <Settings size={20} />, text: "Settings" },
  ];

  export default function Sidebar({ user, activeMenu, onMenuSelect }) {
    const [open, setOpen] = useState(false);

    // Sidebar content
    const sidebarContent = (
      <div className="h-full flex flex-col justify-between">
        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <Sprout className="text-green-600" size={24} />
            <h1 className="text-lg font-bold text-green-700">KRISHI SAKHA</h1>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col mt-4 space-y-1">
            {MENUS.map(menu => (
              <NavItem
                key={menu.key}
                icon={menu.icon}
                text={menu.text}
                active={activeMenu === menu.key}
                onClick={() => {
                  onMenuSelect(menu.key);
                  setOpen(false); // close sidebar on mobile after click
                }}
              />
            ))}
          </nav>
        </div>
        {/* User Profile */}
        <div className="flex items-center gap-3 p-4 border-t">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-semibold">
            {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
          </div>
          <div>
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-sm text-gray-500">{user?.role || "Farmer"}</p>
          </div>
        </div>
      </div>
    );

    return (
      <>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden fixed top-4 left-4 z-40">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md bg-white border shadow"
            aria-label="Open sidebar"
          >
            <MenuIcon className="text-green-700" size={28} />
          </button>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:flex h-screen w-64 bg-white border-r z-30">
          {sidebarContent}
        </div>

        {/* Sidebar drawer for mobile */}
        {open && (
          <div className="fixed inset-0 z-50 flex pointer-events-none">
            {/* Overlay: more transparent, pointer-events only for drawer */}
            <div
              className="fixed inset-0 bg-black bg-opacity-10 transition-opacity duration-200"
              aria-hidden="true"
            />
            {/* Drawer */}
            <div className="relative w-64 h-full bg-white border-r shadow-lg animate-slideInLeft pointer-events-auto">
              <button
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <CloseIcon className="text-green-700" size={24} />
              </button>
              {sidebarContent}
            </div>
            {/* Click outside to close */}
            <div
              className="flex-1"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}
      </>
    );
  }
  
  function NavItem({ icon, text, active, onClick }) {
    return (
      <button
        className={`flex items-center gap-3 px-6 py-2 text-left transition w-full ${
          active
            ? "bg-black text-white rounded-r-full font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={onClick}
      >
        {icon}
        <span className="text-sm">{text}</span>
      </button>
    );
  }

  // Tailwind animation for sidebar drawer
  // Add this to your global CSS if not present:
  // @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  // .animate-slideInLeft { animation: slideInLeft 0.2s ease-out; }
  