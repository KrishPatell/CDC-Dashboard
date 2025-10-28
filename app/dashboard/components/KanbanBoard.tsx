"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Application } from "@/lib/mockData";

interface KanbanBoardProps {
  applications: Application[];
  setApplications: (apps: Application[]) => void;
}

const stages = ["Applied", "Shortlist", "Interview", "Offer"] as const;

const stageColors = {
  Applied: "bg-blue-100 text-blue-700",
  Shortlist: "bg-purple-100 text-purple-700",
  Interview: "bg-orange-100 text-orange-700",
  Offer: "bg-green-100 text-green-700",
};

export default function KanbanBoard({ applications, setApplications }: KanbanBoardProps) {
  const [draggedItem, setDraggedItem] = useState<Application | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, app: Application) => {
    setDraggedItem(app);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (stage: string) => {
    setDragOverStage(stage);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over state if we're leaving the drop zone entirely
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: typeof stages[number]) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem.stage !== targetStage) {
      setApplications(
        applications.map((app) =>
          app.id === draggedItem.id ? { ...app, stage: targetStage } : app
        )
      );
    }
    
    setDraggedItem(null);
    setDragOverStage(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stages.map((stage) => {
        const stageApps = applications.filter((app) => app.stage === stage);
        const isDropTarget = dragOverStage === stage;
        const isDragging = draggedItem !== null;

        return (
          <Card 
            key={stage} 
            className={`bg-slate-50 transition-all duration-200 ${
              isDropTarget ? "ring-2 ring-blue-400 bg-blue-50" : ""
            } ${isDragging ? "border-dashed border-2" : ""}`}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(stage)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center justify-between">
                <span>{stage}</span>
                <Badge variant="secondary" className="text-xs">
                  {stageApps.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 min-h-[200px]">
              {stageApps.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  draggable
                  onDragStart={(e: React.DragEvent) => handleDragStart(e, app)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white p-3 rounded-lg border shadow-sm cursor-move transition-all hover:shadow-md ${
                    draggedItem?.id === app.id ? "opacity-50 rotate-2 scale-105" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-slate-900 mb-1">
                        {app.company}
                      </h4>
                      <p className="text-xs text-slate-600">{app.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    </div>
                  </div>
                  <Badge className={stageColors[stage]} variant="outline">
                    {stage}
                  </Badge>
                </motion.div>
              ))}
              {stageApps.length === 0 && (
                <div className={`text-xs text-slate-400 text-center py-8 border-2 border-dashed rounded-lg transition-all ${
                  isDropTarget ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200"
                }`}>
                  {isDropTarget ? "Drop here" : "No applications"}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

