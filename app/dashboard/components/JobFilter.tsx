"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface JobFilterProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export interface FilterState {
  timing: string[];
  jobType: string[];
  fit: string[];
}

export default function JobFilter({ onFilterChange, activeFilters }: JobFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const timingOptions = [
    { id: "recent", label: "Posted Recently (0-7 days)" },
    { id: "week", label: "Posted This Week (7-14 days)" },
    { id: "month", label: "Posted This Month (14-30 days)" },
    { id: "older", label: "Posted Earlier (30+ days)" },
  ];

  const jobTypeOptions = [
    { id: "internship", label: "Internship" },
    { id: "fulltime", label: "Full-time" },
    { id: "parttime", label: "Part-time" },
  ];

  const fitOptions = [
    { id: "high", label: "High Fit" },
    { id: "medium", label: "Medium Fit" },
    { id: "low", label: "Low Fit" },
  ];

  const handleTimingToggle = (id: string) => {
    const newTiming = activeFilters.timing.includes(id)
      ? activeFilters.timing.filter((t) => t !== id)
      : [...activeFilters.timing, id];
    onFilterChange({ ...activeFilters, timing: newTiming });
  };

  const handleJobTypeToggle = (id: string) => {
    const newJobType = activeFilters.jobType.includes(id)
      ? activeFilters.jobType.filter((t) => t !== id)
      : [...activeFilters.jobType, id];
    onFilterChange({ ...activeFilters, jobType: newJobType });
  };

  const handleFitToggle = (id: string) => {
    const newFit = activeFilters.fit.includes(id)
      ? activeFilters.fit.filter((f) => f !== id)
      : [...activeFilters.fit, id];
    onFilterChange({ ...activeFilters, fit: newFit });
  };

  const clearFilters = () => {
    onFilterChange({ timing: [], jobType: [], fit: [] });
  };

  const hasActiveFilters = activeFilters.timing.length > 0 || activeFilters.jobType.length > 0 || activeFilters.fit.length > 0;

  return (
    <div className="flex items-center justify-end gap-3">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2"
      >
        {/* Timing Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                activeFilters.timing.length > 0 ? "bg-blue-50 border-blue-300" : ""
              }`}
            >
              <span className="text-sm font-medium">Timing</span>
              {activeFilters.timing.length > 0 && (
                <span className="bg-blue-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {activeFilters.timing.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Timing</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {timingOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleTimingToggle(option.id)}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.timing.includes(option.id)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Job Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                activeFilters.jobType.length > 0 ? "bg-green-50 border-green-300" : ""
              }`}
            >
              <span className="text-sm font-medium">Job Type</span>
              {activeFilters.jobType.length > 0 && (
                <span className="bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {activeFilters.jobType.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Job Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {jobTypeOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleJobTypeToggle(option.id)}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.jobType.includes(option.id)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fit Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`flex items-center gap-2 ${
                activeFilters.fit.length > 0 ? "bg-purple-50 border-purple-300" : ""
              }`}
            >
              <span className="text-sm font-medium">Fit</span>
              {activeFilters.fit.length > 0 && (
                <span className="bg-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {activeFilters.fit.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Fit</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {fitOptions.map((option) => (
              <DropdownMenuItem
                key={option.id}
                onClick={() => handleFitToggle(option.id)}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.fit.includes(option.id)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Clear All
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

