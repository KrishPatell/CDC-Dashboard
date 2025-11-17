"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Target, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { CareerGoal } from "@/lib/mockData";

interface CareerPathViewProps {
  goals: CareerGoal[];
}

export default function CareerPathView({ goals }: CareerPathViewProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "role":
        return <Target className="h-5 w-5" />;
      case "company":
        return <TrendingUp className="h-5 w-5" />;
      case "skill":
        return <Target className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "role":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "company":
        return "bg-green-100 text-green-700 border-green-200";
      case "skill":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Career Goals</h2>
        <p className="text-slate-600">Track your long-term career objectives and milestones</p>
      </div>

      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${getCategoryColor(goal.category)}`}
                        >
                          {getCategoryIcon(goal.category)}
                        </div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <Badge className={getCategoryColor(goal.category)}>
                          {goal.category}
                        </Badge>
                      </div>
                      <p className="text-slate-600 mt-2">{goal.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{goal.progress}%</p>
                      <p className="text-xs text-slate-500">
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={goal.progress} className="h-3 mb-4" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-3">Milestones</p>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            milestone.completed
                              ? "bg-green-50 border-green-200"
                              : "bg-slate-50 border-slate-200"
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-400 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                milestone.completed
                                  ? "line-through text-slate-600"
                                  : "text-slate-900"
                              }`}
                            >
                              {milestone.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Due: {new Date(milestone.targetDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No career goals set yet</p>
            <p className="text-sm text-slate-500 mt-2">
              Set your first career goal to start tracking your progress
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

