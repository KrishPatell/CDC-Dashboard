"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Alumni } from "@/lib/mockData";

interface AlumniSearchBarProps {
  onSearch: (query: string) => void;
  allAlumni: Alumni[];
}

export default function AlumniSearchBar({ onSearch, allAlumni }: AlumniSearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Alumni[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allAlumni.filter(
        (alum) =>
          alum.name.toLowerCase().includes(query.toLowerCase()) ||
          alum.company.toLowerCase().includes(query.toLowerCase()) ||
          alum.role.toLowerCase().includes(query.toLowerCase()) ||
          alum.skills?.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allAlumni]);

  const handleSelect = (alum: Alumni) => {
    setQuery(alum.name);
    setShowSuggestions(false);
    onSearch(alum.name);
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search by name, company, role, or skills..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {suggestions.map((alum) => (
              <button
                key={alum.id}
                onClick={() => handleSelect(alum)}
                className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{alum.name}</p>
                  <p className="text-sm text-slate-600">
                    {alum.role} at {alum.company}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

