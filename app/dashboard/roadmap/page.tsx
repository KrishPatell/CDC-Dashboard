"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RoadmapOverview from "../components/roadmap/RoadmapOverview";
import TaskBoard from "../components/roadmap/TaskBoard";
import CareerPathView from "../components/roadmap/CareerPathView";
import SkillsTracker from "../components/roadmap/SkillsTracker";
import AICoachWidget from "../components/roadmap/AICoachWidget";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  roadmapTasks as initialTasks,
  careerGoals as initialGoals,
  skillGoals as initialSkillGoals,
  type RoadmapTask,
  type CareerGoal,
  type SkillGoal,
} from "@/lib/mockData";

type TabType = "overview" | "tasks" | "career" | "skills";

export default function RoadmapCoachPage() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("roadmap");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [tasks, setTasks] = useState<RoadmapTask[]>(initialTasks);
  const [goals, setGoals] = useState<CareerGoal[]>(initialGoals);
  const [skillGoals, setSkillGoals] = useState<SkillGoal[]>(initialSkillGoals);

  // Load from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("roadmapTasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to parse roadmapTasks", error);
      }
    }

    const savedGoals = localStorage.getItem("careerGoals");
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (error) {
        console.error("Failed to parse careerGoals", error);
      }
    }

    const savedSkillGoals = localStorage.getItem("skillGoals");
    if (savedSkillGoals) {
      try {
        setSkillGoals(JSON.parse(savedSkillGoals));
      } catch (error) {
        console.error("Failed to parse skillGoals", error);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("roadmapTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("careerGoals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("skillGoals", JSON.stringify(skillGoals));
  }, [skillGoals]);

  const handleSidebarNavigation = (view: string) => {
    if (view === activeView) {
      return;
    }

    setActiveView(view);

    if (view === "home") {
      router.push("/dashboard");
    } else if (view === "applications") {
      router.push("/dashboard?view=applications");
    } else if (view === "profile") {
      router.push("/dashboard?view=profile");
    } else if (view === "comparator") {
      router.push("/dashboard/comparator");
    } else if (view === "alumni") {
      router.push("/dashboard/alumni");
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
              completedAt: task.done ? undefined : new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleAddTask = (newTask: Partial<RoadmapTask>) => {
    const task: RoadmapTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      task: newTask.task || "",
      done: false,
      ...newTask,
    } as RoadmapTask;
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (id: number, updates: Partial<RoadmapTask>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: FileText },
    { id: "tasks" as TabType, label: "Tasks", icon: Target },
    { id: "career" as TabType, label: "Career Path", icon: TrendingUp },
    { id: "skills" as TabType, label: "Skills", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar activeView={activeView} setActiveView={handleSidebarNavigation} />
      <Navbar onNavigate={handleSidebarNavigation} />

      <main className="ml-60 mt-16 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Roadmap Coach</h1>
                <p className="text-slate-600">
                  Your personalized career roadmap with AI-powered guidance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="mb-6 border-b border-slate-200">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-b-none ${
                      activeTab === tab.id
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RoadmapOverview
                    tasks={tasks}
                    goals={goals}
                    onToggleTask={handleToggleTask}
                  />
                </div>
                <div>
                  <AICoachWidget tasks={tasks} goals={goals} />
                </div>
              </div>
            )}

            {activeTab === "tasks" && (
              <TaskBoard
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
              />
            )}

            {activeTab === "career" && <CareerPathView goals={goals} />}

            {activeTab === "skills" && <SkillsTracker skillGoals={skillGoals} />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

