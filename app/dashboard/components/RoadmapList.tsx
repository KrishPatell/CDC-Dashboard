"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";
import type { RoadmapTask } from "@/lib/mockData";

interface RoadmapListProps {
  tasks: RoadmapTask[];
  toggleTask: (id: number) => void;
}

export default function RoadmapList({ tasks, toggleTask }: RoadmapListProps) {
  const completedCount = tasks.filter((t) => t.done).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Weekly Roadmap Tasks</span>
          <span className="text-sm text-slate-600">
            {completedCount}/{tasks.length}
          </span>
        </CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => toggleTask(task.id)}
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
            <span
              className={`text-sm ${
                task.done
                  ? "line-through text-slate-600"
                  : "text-slate-900 font-medium"
              }`}
            >
              {task.task}
            </span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

