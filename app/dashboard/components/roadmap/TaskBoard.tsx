"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Plus, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import TaskCreator from "./TaskCreator";
import type { RoadmapTask } from "@/lib/mockData";

interface TaskBoardProps {
  tasks: RoadmapTask[];
  onToggleTask: (id: number) => void;
  onAddTask: (task: Partial<RoadmapTask>) => void;
  onUpdateTask: (id: number, updates: Partial<RoadmapTask>) => void;
}

const categories = [
  "application",
  "skill",
  "networking",
  "interview",
  "portfolio",
  "other",
] as const;

const priorities = ["low", "medium", "high", "urgent"] as const;

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-700 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getCategoryColor = (category?: string) => {
  switch (category) {
    case "application":
      return "bg-purple-50 text-purple-700";
    case "skill":
      return "bg-blue-50 text-blue-700";
    case "networking":
      return "bg-green-50 text-green-700";
    case "interview":
      return "bg-orange-50 text-orange-700";
    case "portfolio":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
};

export default function TaskBoard({
  tasks,
  onToggleTask,
  onAddTask,
  onUpdateTask,
}: TaskBoardProps) {
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTasks = selectedCategory
    ? tasks.filter((t) => t.category === selectedCategory)
    : tasks;

  const tasksByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filteredTasks.filter((t) => t.category === cat);
    return acc;
  }, {} as Record<string, RoadmapTask[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
          <p className="text-slate-600">Organize and track your career roadmap tasks</p>
        </div>
        <Button onClick={() => setShowTaskCreator(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All ({tasks.length})
        </Button>
        {categories.map((cat) => {
          const count = tasks.filter((t) => t.category === cat).length;
          return (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
            </Button>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border transition-all ${
                task.done
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-slate-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.done ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-400 hover:text-blue-600" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p
                      className={`font-medium ${
                        task.done ? "line-through text-slate-600" : "text-slate-900"
                      }`}
                    >
                      {task.task}
                    </p>
                    {task.priority && (
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    {task.category && (
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(task.category)}`}>
                        <Tag className="h-3 w-3 mr-1" />
                        {task.category}
                      </Badge>
                    )}
                    {task.deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {task.notes && (
                    <p className="text-sm text-slate-600 mt-2 italic">{task.notes}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-slate-600">
                {selectedCategory
                  ? `No tasks in ${selectedCategory} category`
                  : "No tasks yet. Add your first task to get started!"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Task Creator Modal */}
      <TaskCreator
        open={showTaskCreator}
        onClose={() => setShowTaskCreator(false)}
        onSave={onAddTask}
      />
    </div>
  );
}

