"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, ChevronDown, LogOut, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-60 right-0 h-16 bg-white shadow-sm z-10 border-b">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">CDC Dashboard</h1>
            <p className="text-xs text-slate-600">Student Portal</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">Priya Sharma</p>
                <p className="text-xs text-slate-600">MBA 2026</p>
              </div>
              <Avatar>
                <AvatarImage src="https://avatar.iran.liara.run/public/girl" />
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

