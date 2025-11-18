"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  GitCompare,
  Users,
  Map,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: "home", label: "Dashboard", icon: LayoutDashboard },
  { id: "alumni", label: "Alumni Finder", icon: Users },
  { id: "applications", label: "My Applications", icon: FileText },
  { id: "comparator", label: "CV Comparator", icon: GitCompare },
  { id: "roadmap", label: "Roadmap Coach", icon: Map },
];

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {!isCollapsed && <h2 className="text-lg font-bold">Menu</h2>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-3">
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView("profile")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 ${
              activeView === "profile"
                ? "bg-white/20 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">My Profile</span>}
          </motion.button>
          {!isCollapsed && (
            <div className="bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Need Help?</p>
              <p className="text-xs text-white">Contact CDC Support</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

