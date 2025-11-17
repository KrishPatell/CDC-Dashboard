"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Calendar, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import type { RoadmapTask, CareerGoal } from "@/lib/mockData";

interface RoadmapOverviewProps {
  tasks: RoadmapTask[];
  goals: CareerGoal[];
  onToggleTask: (id: number) => void;
}

export default function RoadmapOverview({
  tasks,
  goals,
  onToggleTask,
}: RoadmapOverviewProps) {
  const completedTasks = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const thisWeekTasks = tasks.filter((task) => {
    if (!task.deadline) return false;
    const deadline = new Date(task.deadline);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return deadline <= weekFromNow && deadline >= now;
  });

  const urgentTasks = tasks.filter(
    (task) => task.priority === "urgent" && !task.done
  );

  const activeGoals = goals.filter((goal) => goal.progress < 100);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-slate-900">
                  {Math.round(overallProgress)}%
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">This Week</p>
                <p className="text-3xl font-bold text-slate-900">
                  {thisWeekTasks.filter((t) => t.done).length}/{thisWeekTasks.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress
              value={
                thisWeekTasks.length > 0
                  ? (thisWeekTasks.filter((t) => t.done).length / thisWeekTasks.length) * 100
                  : 0
              }
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Goals</p>
                <p className="text-3xl font-bold text-slate-900">{activeGoals.length}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {activeGoals.length > 0
                ? `${Math.round(activeGoals.reduce((acc, g) => acc + g.progress, 0) / activeGoals.length)}% avg progress`
                : "No active goals"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tasks */}
      {urgentTasks.length > 0 && (
        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-red-900">
              <Target className="h-5 w-5" />
              Urgent Tasks ({urgentTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => onToggleTask(task.id)}
                className="flex items-center gap-3 p-3 rounded-lg border border-red-200 bg-white cursor-pointer hover:bg-red-50 transition-colors"
              >
                <Circle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{task.task}</p>
                  {task.deadline && (
                    <p className="text-xs text-red-600 mt-1">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => onToggleTask(task.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                task.done
                  ? "bg-green-50 border-green-200"
                  : "hover:bg-slate-50 border-slate-200"
              }`}
            >
              {task.done ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-slate-400 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    task.done
                      ? "line-through text-slate-600"
                      : "text-slate-900 font-medium"
                  }`}
                >
                  {task.task}
                </p>
                {task.category && (
                  <Badge variant="outline" className="text-xs mt-1">
                    {task.category}
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

