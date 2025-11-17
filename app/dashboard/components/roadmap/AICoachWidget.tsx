"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { RoadmapTask, CareerGoal } from "@/lib/mockData";

interface AICoachWidgetProps {
  tasks: RoadmapTask[];
  goals: CareerGoal[];
}

export default function AICoachWidget({ tasks, goals }: AICoachWidgetProps) {
  // Generate AI suggestions based on current state
  const suggestions = [
    {
      id: 1,
      type: "tip",
      title: "Focus on High-Priority Tasks",
      description:
        "You have urgent tasks pending. Complete them first to stay on track with your deadlines.",
      icon: Target,
      color: "bg-red-100 text-red-700",
    },
    {
      id: 2,
      type: "suggestion",
      title: "Update Your Skills Progress",
      description:
        "Consider updating your skill goals based on recent learning. This will help track your growth better.",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      type: "recommendation",
      title: "Network with Alumni",
      description:
        "Connect with alumni from your target companies. They can provide valuable insights and referrals.",
      icon: Lightbulb,
      color: "bg-green-100 text-green-700",
    },
  ];

  const urgentTasks = tasks.filter((t) => t.priority === "urgent" && !t.done);
  const upcomingDeadlines = tasks
    .filter((t) => t.deadline && !t.done)
    .sort((a, b) => {
      if (!a.deadline || !b.deadline) return 0;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    })
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Sparkles className="h-5 w-5" />
            AI Coach Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg border ${suggestion.color} border-opacity-30`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">{suggestion.title}</p>
                    <p className="text-xs opacity-90">{suggestion.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {upcomingDeadlines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingDeadlines.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200"
              >
                <p className="text-sm font-medium text-slate-900">{task.task}</p>
                <Badge variant="outline" className="text-xs">
                  {task.deadline && new Date(task.deadline).toLocaleDateString()}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

