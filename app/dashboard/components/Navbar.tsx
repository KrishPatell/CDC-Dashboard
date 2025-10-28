"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Briefcase, ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-60 right-0 h-16 bg-white shadow-sm z-10 border-b">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">CDC Dashboard</h1>
            <p className="text-xs text-slate-600">Student Portal</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">Priya Sharma</p>
              <p className="text-xs text-slate-600">MBA 2026</p>
            </div>
            <Avatar>
              <AvatarImage src="https://avatar.iran.liara.run/public/girl" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => setShowDropdown(false)}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

