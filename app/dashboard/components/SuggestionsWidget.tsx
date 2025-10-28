"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { suggestions } from "@/lib/mockData";

export default function SuggestionsWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // Show 3-4 suggestions at once

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Move to next group of suggestions
        const nextIndex = prev + visibleCount;
        // If we've gone past the end, loop back to start
        return nextIndex >= suggestions.length ? 0 : nextIndex;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Get the visible suggestions based on current index
  const getVisibleSuggestions = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (currentIndex + i) % suggestions.length;
      visible.push({
        index: idx,
        text: suggestions[idx],
      });
    }
    return visible;
  };

  const visibleSuggestions = getVisibleSuggestions();
  const totalGroups = Math.ceil(suggestions.length / visibleCount);
  const currentGroup = Math.floor(currentIndex / visibleCount);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {visibleSuggestions.map((suggestion, idx) => (
              <motion.div
                key={`${currentIndex}-${suggestion.index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white p-3 rounded-lg border border-blue-200"
              >
                <p className="text-xs text-slate-700">
                  💡 {suggestion.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex gap-1 mt-4 justify-center">
          {Array.from({ length: totalGroups }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * visibleCount)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentGroup
                  ? "w-6 bg-blue-600"
                  : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

