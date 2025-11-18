"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Building2, 
  Briefcase, 
  MoreVertical, 
  ExternalLink,
  TrendingUp,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Application } from "@/lib/mockData";
import { jobs } from "@/lib/mockData";

interface KanbanBoardProps {
  applications: Application[];
  setApplications: (apps: Application[]) => void;
}

const stages = ["Applied", "Shortlist", "Interview", "Offer"] as const;

const stageIcons = {
  Applied: Clock,
  Shortlist: TrendingUp,
  Interview: Briefcase,
  Offer: Building2,
};

const stageColors = {
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Shortlist: "bg-purple-100 text-purple-700 border-purple-200",
  Interview: "bg-orange-100 text-orange-700 border-orange-200",
  Offer: "bg-green-100 text-green-700 border-green-200",
};

export default function KanbanBoard({ applications, setApplications }: KanbanBoardProps) {
  const [draggedItem, setDraggedItem] = useState<Application | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const getJobDetails = (jobId: number) => {
    return jobs.find(job => job.id === jobId);
  };

  const formatDate = (daysAgo: number) => {
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
    return `${Math.floor(daysAgo / 30)} months ago`;
  };

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
    <div>
      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageApps = applications.filter((app) => app.stage === stage);
          const isDropTarget = dragOverStage === stage;
          const isDragging = draggedItem !== null;
          const StageIcon = stageIcons[stage];

          return (
            <Card 
              key={stage} 
              className={`bg-slate-50 transition-all duration-200 ${
                isDropTarget ? "ring-2 ring-blue-400 bg-blue-50 shadow-lg" : ""
              } ${isDragging ? "border-dashed border-2" : ""}`}
              onDragOver={handleDragOver}
              onDragEnter={() => handleDragEnter(stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <CardContent className="space-y-2 min-h-[130px] pt-1 px-3">
                <div className="flex items-center justify-between text-sm font-semibold border-b pb-2 text-slate-800">
                  <div className="flex items-center gap-2">
                    <StageIcon className="h-4 w-4" />
                    <span>{stage}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold h-5 px-2">
                    {stageApps.length}
                  </Badge>
                </div>
                {stageApps.map((app, idx) => {
                  const jobDetails = getJobDetails(app.jobId);
                  
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, app)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white px-3 py-3 rounded-lg border shadow-sm cursor-move transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 group ${
                          draggedItem?.id === app.id ? "opacity-50 rotate-1 scale-[1.02]" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-slate-900 mb-1 truncate">
                              {app.company}
                            </h4>
                            <p className="text-xs text-slate-600 mb-2 line-clamp-2">{app.role}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center justify-between">
                          {jobDetails?.postedDaysAgo !== undefined && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(jobDetails.postedDaysAgo)}</span>
                            </div>
                          )}
                          <Badge className={`${stageColors[stage]} text-[11px] font-medium border`}>
                            {stage}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {stageApps.length === 0 && (
                  <div className={`text-xs text-slate-400 text-center py-12 border-2 border-dashed rounded-lg transition-all ${
                    isDropTarget ? "border-blue-400 bg-blue-50 text-blue-600" : "border-slate-200"
                  }`}>
                    {isDropTarget ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Drop here</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <StageIcon className="h-8 w-8 text-slate-300" />
                        <span>No applications</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

