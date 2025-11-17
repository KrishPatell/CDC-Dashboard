"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import type { RoadmapTask } from "@/lib/mockData";

interface TaskCreatorProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Partial<RoadmapTask>) => void;
}

export default function TaskCreator({ open, onClose, onSave }: TaskCreatorProps) {
  const [task, setTask] = useState({
    task: "",
    category: "other" as RoadmapTask["category"],
    priority: "medium" as RoadmapTask["priority"],
    deadline: "",
    notes: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const handleSave = () => {
    if (!task.task.trim()) return;

    const newTask: Partial<RoadmapTask> = {
      task: task.task,
      done: false,
      category: task.category,
      priority: task.priority,
      deadline: task.deadline || undefined,
      notes: task.notes || undefined,
      tags: task.tags.length > 0 ? task.tags : undefined,
      createdAt: new Date().toISOString(),
    };

    onSave(newTask);
    setTask({
      task: "",
      category: "other",
      priority: "medium",
      deadline: "",
      notes: "",
      tags: [],
    });
    setTagInput("");
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !task.tags.includes(tagInput.trim())) {
      setTask({ ...task, tags: [...task.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTask({ ...task, tags: task.tags.filter((t) => t !== tag) });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle>Create New Task</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="task">Task Description *</Label>
            <Input
              id="task"
              value={task.task}
              onChange={(e) => setTask({ ...task, task: e.target.value })}
              placeholder="e.g., Complete SQL certification course"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={task.category}
                onValueChange={(value) =>
                  setTask({ ...task, category: value as RoadmapTask["category"] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="skill">Skill</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={task.priority}
                onValueChange={(value) =>
                  setTask({ ...task, priority: value as RoadmapTask["priority"] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={task.deadline}
              onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={task.notes}
              onChange={(e) => setTask({ ...task, notes: e.target.value })}
              placeholder="Additional details or reminders..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="Add a tag and press Enter"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

